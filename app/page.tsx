import { GetLunch } from "./api/menu";

export const revalidate = 3600;

export default async function Home() {
  const courses = await GetLunch();

  const aCourse = courses["A코스"] || [];
  const bCourse = courses["B코스"] || [];
  const commonCourse = courses["공통"] || [];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            오늘의 점심 메뉴
          </h1>
        </div>

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
      </main>
    </div>
  );
}
