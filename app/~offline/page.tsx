import Link from 'next/link'

export const metadata = {
  title: '오프라인',
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-6xl" role="img" aria-label="연결 끊김">
        📡
      </div>
      <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
        오프라인 상태입니다
      </h1>
      <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
        인터넷 연결을 확인해주세요. 이전에 방문한 페이지는 캐시에서 열람할 수
        있습니다.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-500 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-600"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
