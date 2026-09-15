"use client";

import { useRef, useState, useEffect } from "react";

export interface DayMenu {
    day: string; // 예: "월", "화", "수"
    date: string; // 예: "10.14"
    isToday?: boolean;
    courses: {
        "A코스"?: string[];
        "B코스"?: string[];
        "공통"?: string[];
    };
}

interface WeeklyMenuCarouselProps {
    weeklyData: DayMenu[];
}

export default function WeeklyMenuCarousel({ weeklyData }: WeeklyMenuCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 오늘 날짜 카드 자동 포커스
    useEffect(() => {
        const todayIndex = weeklyData.findIndex((item) => item.isToday);
        if (todayIndex !== -1) {
            scrollToIndex(todayIndex);
        }
    }, [weeklyData]);

    const scrollToIndex = (index: number) => {
        setActiveIndex(index);
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: cardWidth * index,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const newIndex = Math.round(scrollLeft / clientWidth);
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < weeklyData.length) {
                setActiveIndex(newIndex);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* 요일 선택 상단 탭 */}
            <div className="flex justify-center gap-2 overflow-x-auto py-2">
                {weeklyData.map((data, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`flex flex-col items-center rounded-xl px-4 py-2 transition-all ${activeIndex === index
                                ? "bg-neutral-900 text-white shadow-md scale-105"
                                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                            }`}
                    >
                        <span className="text-xs opacity-80">{data.date}</span>
                        <span className="text-sm font-bold">{data.day}요일</span>
                    </button>
                ))}
            </div>

            {/* 카드 스와이프 컨테이너 */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide gap-4"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {weeklyData.map((data, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 snap-center rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        {/* 카드 헤더 */}
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-neutral-800">
                                    {data.day}요일 <span className="text-sm text-neutral-500 font-normal">({data.date})</span>
                                </h2>
                                {data.isToday && (
                                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                        오늘
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-neutral-400">
                                {index + 1} / {weeklyData.length}
                            </span>
                        </div>

                        {/* 식단 코스 목록 */}
                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* A 코스 */}
                            {data.courses["A코스"] && data.courses["A코스"].length > 0 && (
                                <div className="rounded-lg bg-neutral-50 p-4">
                                    <h3 className="font-bold text-neutral-800 mb-2">A코스</h3>
                                    <ul className="space-y-1.5 text-sm text-neutral-700">
                                        {data.courses["A코스"].map((item, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* B 코스 */}
                            {data.courses["B코스"] && data.courses["B코스"].length > 0 && (
                                <div className="rounded-lg bg-neutral-50 p-4">
                                    <h3 className="font-bold text-neutral-800 mb-2">B코스</h3>
                                    <ul className="space-y-1.5 text-sm text-neutral-700">
                                        {data.courses["B코스"].map((item, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 공통 코스 */}
                            {data.courses["공통"] && data.courses["공통"].length > 0 && (
                                <div className="rounded-lg bg-neutral-50 p-4 md:col-span-2">
                                    <h3 className="font-bold text-neutral-800 mb-2">공통</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-700">
                                        {data.courses["공통"].map((item, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}