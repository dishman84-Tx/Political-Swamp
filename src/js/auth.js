/**
 * Auth Module — Google Sign-In with Popup + Redirect Fallback
 */
import {
  auth, googleProvider,
  signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut as fbSignOut, onAuthStateChanged
} from './firebase-config.js';

let currentUser = null;

/**
 * Handle Google Sign-In
 */
export async function handleSignIn() {
  const errorEl = document.getElementById('authError');
  const btn = document.getElementById('btnGoogleSignIn');

  if (errorEl) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }

  if (btn) {
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-wait');
  }

  try {
    // Directly trigger popup while user gesture is active
    const result = await signInWithPopup(auth, googleProvider);
    console.log('[Auth] Popup sign-in success:', result.user.email);
    return result.user;
  } catch (err) {
    console.error('[Auth] Sign-in error:', err.code, err.message);

    if (btn) {
      btn.disabled = false;
      btn.classList.remove('opacity-75', 'cursor-wait');
    }

    if (err.code === 'auth/popup-closed-by-user') {
      return null;
    }

    // If popup was blocked by browser, automatically fall back to redirect
    if (err.code === 'auth/popup-blocked') {
      console.warn('[Auth] Popup blocked, falling back to redirect...');
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (redirectErr) {
        console.error('[Auth] Redirect fallback error:', redirectErr);
      }
    }

    if (errorEl) {
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/admin-restricted-operation') {
        errorEl.innerHTML = `Google Sign-In is not enabled. <a href="https://console.firebase.google.com/project/mission-political-swamp/authentication/providers" target="_blank" class="underline text-teal-400 hover:text-teal-300">Enable it in Firebase Console →</a>`;
      } else if (err.code === 'auth/unauthorized-domain') {
        errorEl.innerHTML = `This domain is not authorized. <a href="https://console.firebase.google.com/project/mission-political-swamp/authentication/settings" target="_blank" class="underline text-teal-400 hover:text-teal-300">Add it in Firebase Console →</a>`;
      } else {
        errorEl.textContent = `Sign-in error (${err.code}): ${err.message}`;
      }
      errorEl.classList.remove('hidden');
    }
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
 * Initialize auth state listener
 */
export function initAuth(onAuth) {
  // Check if returning from redirect sign-in
  getRedirectResult(auth).then((result) => {
    if (result?.user) {
      console.log('[Auth] Redirect sign-in success:', result.user.email);
      currentUser = result.user;
      onAuth(result.user);
    }
  }).catch((err) => {
    console.warn('[Auth] getRedirectResult:', err);
  });

  // Regular auth state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('[Auth] User authenticated:', user.email, user.displayName);
      currentUser = user;
      onAuth(user);
    } else {
      console.log('[Auth] No user signed in');
      currentUser = null;
      onAuth(null);
    }
  });
}

export function getCurrentUser() {
  return currentUser;
}
