export interface Courses {
    "A코스"?: string[];
    "B코스"?: string[];
    "공통"?: string[];
    [key: string]: string[] | undefined;
}

export interface DailyMenuItem {
    date: string; // 예: "2026-09-14"
    weekday: string; // 예: "월"
    courses: Courses;
}

// 백엔드 /meal 엔드포인트 전체 응답 타입
export interface MealResponse {
    post?: {
        num: string;
        title: string;
        link: string;
        date: string;
        views: string;
    };
    period?: string;
    images?: Array<{ url: string; alt: string }>;
    daily_menus?: Record<string, DailyMenuItem>;
    menu_text?: string[];
    message?: string;
}

// UI 캐러셀 컴포넌트 전달용 타입
export interface DayMenu {
    day: string;
    date: string;
    isToday?: boolean;
    courses: Courses;
}