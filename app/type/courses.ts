export interface Courses {
    "A코스": string[];
    "B코스": string[];
    "공통": string[];
    [key: string]: string[];
}

export interface MealResponse {
    courses: Courses;
}
