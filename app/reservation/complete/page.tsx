"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ReservationCompleteContent() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("id");

  // 계좌 정보 (실제로는 환경 변수나 설정 파일에서 가져와야 함)
  const accountInfo = {
    bank: "신한은행",
    accountNumber: "110-444-642141",
    accountHolder: "면역공방",
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              예약 접수 완료
            </h1>
            <p className="text-gray-600">
              예약이 성공적으로 접수되었습니다.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              입금 안내
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">은행명</p>
                <p className="text-lg font-semibold text-gray-900">
                  {accountInfo.bank}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">계좌번호</p>
                <p className="text-lg font-semibold text-gray-900">
                  {accountInfo.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">예금주</p>
                <p className="text-lg font-semibold text-gray-900">
                  {accountInfo.accountHolder}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>입금 기한:</strong> 예약 후 24시간 이내 입금 시 예약이 확정됩니다.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>안내:</strong> 입금 확인 후 센터에서 별도로 연락드리겠습니다.
                계좌번호는 스크린샷을 저장해두시면 편리합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              홈으로 돌아가기
            </Link>
            <Link
              href="/modify"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              예약 변경하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ReservationCompletePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ReservationCompleteContent />
    </Suspense>
  );
}

