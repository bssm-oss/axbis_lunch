export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            오늘의 점심 메뉴
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
          <h2 className="mt-6 text-lg font-bold text-neutral-800">
            메뉴를 불러오는 중입니다
          </h2>
          <p className="mt-2 text-sm text-neutral-500 max-w-md leading-relaxed">
            첫 메뉴 호출 시 이미지 OCR 분석으로 인해 최대 1분 정도 소요될 수 있습니다. 잠시만 기다려 주세요.
          </p>
        </div>
      </main>
    </div>
  );
}
