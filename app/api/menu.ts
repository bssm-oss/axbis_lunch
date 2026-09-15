import { DayMenu, MealResponse } from "../type/courses";

const REVALIDATE_TIME = 3600 * 48; // 48시간

/**
 * 한국 표준시(KST, UTC+9) 기준 Date 객체 반환
 */
const getKSTDate = (): Date => {
    const now = new Date();
    return new Date(now.getTime() + (9 * 60 + now.getTimezoneOffset()) * 60000);
};

/**
 * KST 기준 오늘이 월요일인지 확인
 */
const isMondayInKST = (): boolean => getKSTDate().getDay() === 1;

/**
 * KST 기준 오늘 날짜 문자열 반환 ("YYYY-MM-DD")
 */
const getTodayKSTString = (kstDate: Date): string => {
    const y = kstDate.getFullYear();
    const m = String(kstDate.getMonth() + 1).padStart(2, "0");
    const d = String(kstDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

export const GetWeeklyLunch = async (): Promise<DayMenu[]> => {
    try {
        const isMonday = isMondayInKST();
        const fetchOptions: RequestInit = isMonday
            ? { cache: "no-store" }
            : {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: ["lunch-menu"],
                },
            };

        const response = await fetch("https://axbis-menu.vercel.app/meal", fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MealResponse = await response.json();
        const dailyMenus = data?.daily_menus || {};

        const kstNow = getKSTDate();
        const todayStr = getTodayKSTString(kstNow);

        return Object.values(dailyMenus).map((item) => {
            // "2026-09-14" -> "09.14" 로 포맷 변환
            const formattedDate = item.date
                ? item.date.slice(5).replace("-", ".")
                : "";

            return {
                day: item.weekday,
                date: formattedDate,
                isToday: item.date === todayStr,
                courses: item.courses || {
                    "A코스": [],
                    "B코스": [],
                    "공통": [],
                },
            };
        });
    } catch (error) {
        console.error("Failed to fetch weekly lunch menu:", error);
        return [];
    }
};