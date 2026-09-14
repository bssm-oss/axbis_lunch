import { Courses, MealResponse } from "../type/courses";

const REVALIDATE_TIME = 3600 * 48;

/**
 * 한국 표준시(KST, UTC+9) 기준으로 오늘이 월요일인지 확인합니다.
 * 0: 일요일, 1: 월요일, ..., 6: 토요일
 */
const isMondayInKST = (): boolean => {
    const now = new Date();
    const kstDate = new Date(now.getTime() + (9 * 60 + now.getTimezoneOffset()) * 60000);
    return kstDate.getDay() === 1;
};

export const GetLunch = async (): Promise<Courses> => {
    try {
        const isMonday = isMondayInKST();

        // 월요일에는 최신 식단 갱신을 위해 캐시를 사용하지 않고 직접 요청을 보냅니다.
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

        return (
            data?.courses ?? {
                "A코스": [],
                "B코스": [],
                "공통": [],
            }
        );
    } catch (error) {
        console.error("Failed to fetch lunch menu:", error);
        return {
            "A코스": [],
            "B코스": [],
            "공통": [],
        };
    }
};
