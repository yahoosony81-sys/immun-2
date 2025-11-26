import type { Metadata } from "next";
import "./globals.css";
import ModifyButton from "@/components/ModifyButton";

export const metadata: Metadata = {
  title: "면역공방 예약 - 마인드 피트니스",
  description: "마인드 피트니스 회원을 위한 면역공방 예약 서비스. 첫 방문 50% 할인 혜택을 놓치지 마세요.",
  openGraph: {
    title: "면역공방 예약 - 마인드 피트니스",
    description: "마인드 피트니스 회원을 위한 면역공방 예약 서비스. 첫 방문 50% 할인 혜택을 놓치지 마세요.",
    url: "https://immunwellness.vercel.app",
    siteName: "마인드 피트니스 면역공방",
    images: [
      {
        url: "/immun2.png",
        width: 1200,
        height: 630,
        alt: "면역공방 예약 서비스 미리보기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "면역공방 예약 - 마인드 피트니스",
    description: "마인드 피트니스 회원을 위한 면역공방 예약 서비스. 첫 방문 50% 할인",
    images: ["/immun2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ModifyButton />
        {children}
      </body>
    </html>
  );
}

