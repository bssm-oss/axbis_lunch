import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AXBIS 점심 식단표",
    short_name: "점심메뉴",
    description: "AXBIS 구내식당 오늘의 점심 식단표",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
