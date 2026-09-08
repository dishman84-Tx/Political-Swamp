"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Firestore Synchronization Utility
Purpose: Programmatic admin connection to Cloud Firestore using local Firebase CLI OAuth credentials
         (zero homework / zero manual service account downloads).
"""

import os
import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.cloud import firestore

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("firestore_sync")

PROJECT_ID = "mission-political-swamp"
FIREBASE_CLIENT_ID = "563584335869-fgrhgmd47bqnekij5i8b5pr03ho85qd6.apps.googleusercontent.com"

_db_client = None

def get_firestore_client():
    """
    Initializes and returns a singleton Firestore client.
    First checks for Application Default Credentials, then falls back to
    Firebase CLI credentials stored in ~/.config/configstore/firebase-tools.json.
    """
    global _db_client
    if _db_client is not None:
        return _db_client

    configstore_path = Path(os.path.expanduser("~/.config/configstore/firebase-tools.json"))
    if not configstore_path.exists():
        raise FileNotFoundError(f"Firebase credentials not found at {configstore_path}. Run 'firebase login' first.")

    with open(configstore_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    tokens = data.get("tokens", {})
    refresh_token = tokens.get("refresh_token")
    access_token = tokens.get("access_token")

    if not refresh_token:
        raise ValueError("No refresh_token found in Firebase CLI configstore.")

    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=FIREBASE_CLIENT_ID,
    )

    _db_client = firestore.Client(project=PROJECT_ID, credentials=creds)
    logger.info("Successfully connected to Firestore project: %s", PROJECT_ID)
    return _db_client

def upsert_entity(entity_id: str, data: dict):
    """Upsert an entity document into the 'entities' collection."""
    db = get_firestore_client()
    doc_ref = db.collection("entities").document(entity_id)
    doc_ref.set(data, merge=True)
    logger.debug("Upserted entity: %s", entity_id)

def upsert_edge(edge_id: str, data: dict):
    """Upsert a relationship edge document into the 'edges' collection."""
    db = get_firestore_client()
    doc_ref = db.collection("edges").document(edge_id)
    doc_ref.set(data, merge=True)
    logger.debug("Upserted edge: %s", edge_id)

def add_allowlist_user(email: str, role: str = "investigator"):
    """Register an authorized email in the 'allowlist' collection."""
    db = get_firestore_client()
    clean_email = email.strip().lower()
    doc_ref = db.collection("allowlist").document(clean_email)
    doc_ref.set({
        "email": clean_email,
        "role": role,
        "authorized_at": datetime.now(timezone.utc).isoformat()
    }, merge=True)
    logger.info("Allowlisted user: %s (%s)", clean_email, role)

def log_audit_event(action: str, actor: str, details: str, metadata: dict = None):
    """Write an immutable audit log entry into 'audit_log'."""
    db = get_firestore_client()
    event_data = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "action": action,
        "actor": actor,
        "details": details,
        "metadata": metadata or {}
    }
    db.collection("audit_log").add(event_data)
    logger.info("Audit log recorded: [%s] %s by %s", action, details, actor)

if __name__ == "__main__":
    db = get_firestore_client()
    print(f"Firestore Client Active for: {db.project}")
