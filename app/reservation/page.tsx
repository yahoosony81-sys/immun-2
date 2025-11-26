"use client";

import { useRouter } from "next/navigation";
import ReservationForm from "@/components/ReservationForm";
import { saveReservation } from "@/lib/api";
import { ReservationFormData } from "@/types/reservation";

export default function ReservationPage() {
  const router = useRouter();

  const handleSubmit = async (data: ReservationFormData) => {
    try {
      const reservationId = await saveReservation(data);
      router.push(`/reservation/complete?id=${reservationId}`);
    } catch (error) {
      console.error("예약 저장 오류:", error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">예약하기</h1>
          <p className="text-gray-600 mb-8">
            아래 정보를 입력해주세요. 첫 방문 고객님께는 50% 할인 혜택을 드립니다.
          </p>
          <ReservationForm onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}

