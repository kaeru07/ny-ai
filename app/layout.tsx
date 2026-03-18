import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "麻雀 待ち牌クイズ",
  description: "牌譜から待ち牌当てクイズを出題するMVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
