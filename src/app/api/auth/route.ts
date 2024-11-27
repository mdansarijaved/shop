import { env } from "@/env";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_KEY,
  privateKey: env.IMAGEKIT_SECRET,
  urlEndpoint: env.NEXT_PUBLIC_IMGKIT_URL,
});

export async function GET(request: Request) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
