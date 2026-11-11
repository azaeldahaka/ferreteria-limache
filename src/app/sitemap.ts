import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ferreteria-limache.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
