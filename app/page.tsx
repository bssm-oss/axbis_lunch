import { Suspense } from "react";
import { GetWeeklyLunch } from "./api/menu";
import WeeklyMenuCarousel from "./WeeklyMenuCarousel";

export const dynamic = "force-dynamic";

async function MenuList() {
  // GetWeeklyLunch()가 DayMenu[] 데이터 배열을 반환하도록 API 구성
  const weeklyData = await GetWeeklyLunch();

  return <WeeklyMenuCarousel weeklyData={weeklyData} />;
}

function MenuLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
      <h2 className="mt-6 text-lg font-bold text-neutral-800">
        주간 메뉴를 불러오는 중입니다
      </h2>
      <p className="mt-2 text-sm text-neutral-500 max-w-md leading-relaxed">
        이미지 분석 및 데이터 조회를 수행하고 있습니다. 잠시만 기다려 주세요.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            이번 주 점심 메뉴
          </h1>
        </div>

        <Suspense fallback={<MenuLoadingFallback />}>
          <MenuList />
        </Suspense>
      </main>
    </div>
  );
}