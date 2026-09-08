/**
 * Auth Module — Google Sign-In
 * Allowlist temporarily disabled for initial setup/debug
 */
import {
  auth, googleProvider,
  signInWithPopup, signOut as fbSignOut, onAuthStateChanged,
  setPersistence, browserLocalPersistence
} from './firebase-config.js';

let currentUser = null;

/**
 * Handle Google Sign-In
 */
export async function handleSignIn() {
  const errorEl = document.getElementById('authError');
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, googleProvider);
    console.log('[Auth] Sign-in success:', result.user.email);
    return result.user;
  } catch (err) {
    console.error('[Auth] Sign-in error:', err.code, err.message);
    if (err.code === 'auth/popup-closed-by-user') return null;

    if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/admin-restricted-operation') {
      errorEl.innerHTML = `Google Sign-In is not enabled. <a href="https://console.firebase.google.com/project/mission-political-swamp/authentication/providers" target="_blank" class="underline text-teal-400 hover:text-teal-300">Enable it in Firebase Console →</a>`;
    } else if (err.code === 'auth/unauthorized-domain') {
      errorEl.innerHTML = `This domain is not authorized. <a href="https://console.firebase.google.com/project/mission-political-swamp/authentication/settings" target="_blank" class="underline text-teal-400 hover:text-teal-300">Add it in Firebase Console →</a>`;
    } else {
      errorEl.textContent = `Sign-in error: ${err.code} — ${err.message}`;
    }
    errorEl.classList.remove('hidden');
    return null;
  }
}

/**
 * Handle Sign Out
 */
export async function handleSignOut() {
  await fbSignOut(auth);
  currentUser = null;
}

/**
 * Initialize auth state listener — NO allowlist gate
 * Once sign-in works, we'll re-enable the allowlist
 */
export function initAuth(onAuth) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('[Auth] User authenticated:', user.email, user.displayName);
      currentUser = user;
      onAuth(user);
    } else {
      console.log('[Auth] No user');
      currentUser = null;
      onAuth(null);
    }
  });
}

export function getCurrentUser() {
  return currentUser;
}
