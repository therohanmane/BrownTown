#!/usr/bin/env node
/**
 * Fetches real duration and publish date for every video in src/data/videos.js
 * from the official YouTube Data API v3 and writes src/data/video-meta.json.
 *
 *   YOUTUBE_API_KEY=... node scripts/sync-youtube-meta.mjs
 *
 * The key is only used by this local script; it is never bundled or deployed.
 * Commit the resulting JSON. Re-run whenever the catalogue changes.
 * Videos that are private/removed are reported and left out of the file.
 */
import { writeFile, readFile } from 'node:fs/promises';
import { VIDEOS } from '../src/data/videos.js';

async function loadKey() {
  if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY;
  try {
    const env = await readFile(new URL('../.env', import.meta.url), 'utf8');
    return env.match(/^YOUTUBE_API_KEY=(.+)$/m)?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const parseIsoDuration = (iso) => {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '');
  if (!m) return null;
  const [, d = 0, h = 0, min = 0, s = 0] = m.map((x) => Number(x || 0));
  return d * 86400 + h * 3600 + min * 60 + s;
};

const key = await loadKey();
if (!key) {
  console.error('YOUTUBE_API_KEY is not set (environment or .env). Nothing was changed.');
  process.exit(1);
}

const ids = VIDEOS.map((v) => v.youtubeId);
const meta = {};
for (let i = 0; i < ids.length; i += 50) {
  const batch = ids.slice(i, i + 50);
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'contentDetails,snippet');
  url.searchParams.set('id', batch.join(','));
  url.searchParams.set('key', key);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`YouTube API error ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const json = await res.json();
  for (const item of json.items || []) {
    meta[item.id] = {
      durationSeconds: parseIsoDuration(item.contentDetails?.duration),
      publishedAt: item.snippet?.publishedAt || null,
      channelTitle: item.snippet?.channelTitle || null
    };
  }
}

const missing = ids.filter((id) => !meta[id]);
if (missing.length) console.warn('Not returned by the API (private/removed?):', missing.join(', '));

const out = { syncedAt: new Date().toISOString(), source: 'YouTube Data API v3', videos: meta };
await writeFile(new URL('../src/data/video-meta.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote metadata for ${Object.keys(meta).length}/${ids.length} videos.`);
