import type { Metadata } from "next";
import "./globals.css";
import ModifyButton from "@/components/ModifyButton";

export const metadata: Metadata = {
  title: "면역공방 예약 - 마인드 피트니스",
  description: "면역 스파/처치 예약 페이지",
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

