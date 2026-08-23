import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CHANNEL_ID = "UCUNICOshWK4Ti7rEY0MJjcQ";
const CHANNEL_URL = "https://www.youtube.com/@vamosaestudiarespanol";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_TTL_MS = 15 * 60 * 1000;
const ALLOWED_ORIGINS = new Set([
  "https://pratica.vamosaestudiarespanol.com.br",
  "https://sasilva-cyber.github.io"
]);

type Video = {
  id: string;
  title: string;
  published_at: string;
  url: string;
  embed_url: string;
  thumbnail_url: string;
};

let cache: { at: number; videos: Video[] } | null = null;

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin)
    ? origin
    : "https://pratica.vamosaestudiarespanol.com.br";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin"
  };
}

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function tag(block: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function parseFeed(xml: string): Video[] {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)]
    .map((match) => match[1])
    .slice(0, 3);

  return entries.map((entry) => {
    const id = tag(entry, "yt:videoId");
    return {
      id,
      title: tag(entry, "title") || "Vídeo do Vamos a Estudiar Español",
      published_at: tag(entry, "published"),
      url: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
      embed_url: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1`,
      thumbnail_url: `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`
    };
  }).filter((video) => video.id);
}

async function latestVideos() {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.videos;

  const response = await fetch(FEED_URL, {
    headers: {
      "Accept": "application/atom+xml,application/xml,text/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "VamosAEstudiarEspanol/1.0"
    }
  });

  if (!response.ok) throw new Error(`YOUTUBE_FEED_${response.status}`);
  const xml = await response.text();
  const videos = parseFeed(xml);
  if (!videos.length) throw new Error("YOUTUBE_FEED_EMPTY");
  cache = { at: Date.now(), videos };
  return videos;
}

Deno.serve(async (req: Request) => {
  const headers = corsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json; charset=utf-8" }
    });
  }

  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "origin_not_allowed" }), {
      status: 403,
      headers: { ...headers, "Content-Type": "application/json; charset=utf-8" }
    });
  }

  try {
    const videos = await latestVideos();
    return new Response(JSON.stringify({
      channel: {
        id: CHANNEL_ID,
        title: "¡Vamos a Estudiar Español!",
        url: CHANNEL_URL
      },
      videos,
      refreshed_at: new Date().toISOString(),
      cache_seconds: 900
    }), {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=900, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    console.error("youtube-latest", error);
    return new Response(JSON.stringify({ error: "youtube_feed_unavailable" }), {
      status: 502,
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
});
