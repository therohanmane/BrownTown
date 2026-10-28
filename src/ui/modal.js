import { h, YT_ID_RE } from './dom.js';

/**
 * Video modal built on <dialog>. The YouTube iframe (privacy-enhanced
 * youtube-nocookie.com domain) is created only when the visitor presses play
 * and destroyed on close, so nothing loads from YouTube until then and audio
 * always stops when the dialog closes.
 */
let dialog, frame, titleEl, ytLink, trigger, savedScroll = 0;

export function initVideoModal() {
  dialog = document.getElementById('video-modal');
  frame = document.getElementById('video-frame');
  titleEl = document.getElementById('video-modal-title');
  ytLink = document.getElementById('video-modal-yt');
  if (!dialog) return;

  document.getElementById('video-modal-close').addEventListener('click', () => dialog.close());
  // Click on the backdrop (the dialog element itself, outside .video-modal-inner) closes.
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', onClose);
}

export function openVideo({ youtubeId, title }, opener) {
  if (!dialog || !YT_ID_RE.test(youtubeId)) return;
  trigger = opener || document.activeElement;

  titleEl.textContent = title;
  titleEl.lang = 'mr';
  ytLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;

  frame.replaceChildren(
    h('iframe', {
      src: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`,
      title,
      allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
      allowfullscreen: true,
      referrerpolicy: 'strict-origin-when-cross-origin',
      loading: 'eager'
    })
  );

  // Lock background scroll without losing the reader's position.
  savedScroll = window.scrollY;
  document.documentElement.classList.add('is-modal-open');
  dialog.showModal();
  document.getElementById('video-modal-close').focus();
}

function onClose() {
  frame.replaceChildren(); // removes the iframe → playback stops
  document.documentElement.classList.remove('is-modal-open');
  if (Math.abs(window.scrollY - savedScroll) > 2) window.scrollTo({ top: savedScroll, behavior: 'instant' });
  if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
  trigger = null;
}
