"use client";

import Link from "next/link";

export default function ModifyButton() {
  return (
    <Link
      href="/modify"
      className="fixed top-4 right-4 z-50 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium"
    >
      예약 변경
    </Link>
  );
}

