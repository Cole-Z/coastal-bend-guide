import type { Metadata } from "next";
import { PRODUCTION_SITE_URL, SITE_NAME } from "@/lib/site";

const shareImage = {
  url: `${PRODUCTION_SITE_URL}/images/cc-bay-life-share.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "CC Bay Life, a local guide to the bay, beaches, and towns around Corpus Christi, Texas",
};

interface SocialMetadataOptions {
  title: string;
  description: string;
  path: string;
  article?: { publishedTime?: string; modifiedTime?: string };
}

export function socialMetadata({ title, description, path, article }: SocialMetadataOptions) {
  return {
    openGraph: {
      ...(article ? { type: "article" as const, ...article } : { type: "website" as const }),
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  } satisfies Pick<Metadata, "openGraph" | "twitter">;
}
