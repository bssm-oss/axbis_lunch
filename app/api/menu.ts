import { Courses, MealResponse } from "../type/courses";

const REVALIDATE_TIME = 3600 * 48;

export const GetLunch = async (): Promise<Courses> => {
    try {
        const response = await fetch("https://axbis-menu.vercel.app/meal", {
            next: {
                revalidate: REVALIDATE_TIME,
                tags: ["lunch-menu"],
            },
        });

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
