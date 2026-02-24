interface VideoEmbedProps {
  url: string
  title: string
  poster?: string
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }

  return null
}

function isNativeVideoUrl(url: string): boolean {
  return url.endsWith('.mp4') || url.endsWith('.webm')
}

function getVideoMimeType(url: string): string {
  if (url.endsWith('.webm')) return 'video/webm'
  return 'video/mp4'
}

export default function VideoEmbed({ url, title, poster }: VideoEmbedProps) {
  // 네이티브 비디오 (MP4/WebM)
  if (isNativeVideoUrl(url)) {
    return (
      <div className="my-4 overflow-hidden rounded-lg" role="region" aria-label={title}>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            className="absolute left-0 top-0 h-full w-full"
            controls
            preload="none"
            poster={poster}
          >
            <source src={url} type={getVideoMimeType(url)} />
          </video>
        </div>
      </div>
    )
  }

  // YouTube 임베드
  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="my-4 overflow-hidden rounded-lg">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          allowFullScreen
        />
      </div>
    </div>
  )
}
