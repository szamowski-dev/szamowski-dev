import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";
import { SocialImage } from "@/lib/social-image";

export const alt = `${siteConfig.name}, ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(<SocialImage />, size);
}
