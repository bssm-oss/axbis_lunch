import { Suspense } from "react";
import { GetLunch } from "./api/menu";

export const dynamic = "force-dynamic";

async function MenuList() {
  const courses = await GetLunch();

  const aCourse = courses["A코스"] || [];
  const bCourse = courses["B코스"] || [];
  const commonCourse = courses["공통"] || [];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {aCourse.length > 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-neutral-100 pb-3 text-lg font-bold text-neutral-800">
            A코스
          </h2>
          <ul className="mt-4 space-y-2.5">
            {aCourse.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-neutral-700 text-sm sm:text-base"
              >
                <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bCourse.length > 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-neutral-100 pb-3 text-lg font-bold text-neutral-800">
            B코스
          </h2>
          <ul className="mt-4 space-y-2.5">
            {bCourse.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-neutral-700 text-sm sm:text-base"
              >
                <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {commonCourse.length > 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="border-b border-neutral-100 pb-3 text-lg font-bold text-neutral-800">
            공통
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {commonCourse.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-neutral-700 text-sm sm:text-base"
              >
                <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
      <h2 className="mt-6 text-lg font-bold text-neutral-800">
        메뉴를 불러오는 중입니다
      </h2>
      <p className="mt-2 text-sm text-neutral-500 max-w-md leading-relaxed">
        첫 메뉴 호출 시 이미지 OCR 분석으로 인해 최대 1분 정도 소요될 수 있습니다. 잠시만 기다려 주세요.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            오늘의 점심 메뉴
          </h1>
        </div>

        <Suspense fallback={<MenuLoadingFallback />}>
          <MenuList />
        </Suspense>
      </main>
    </div>
  );
}
