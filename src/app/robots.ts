import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/en/search", "/bn/search"] },
    sitemap: "https://brandbangladesh.gov.bd/sitemap.xml",
  }
}
