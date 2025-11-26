import { ReservationFormData } from "@/types/reservation";

// 노션 API를 통한 예약 저장
export async function saveReservation(data: ReservationFormData): Promise<string> {
  try {
    console.log("📤 예약 데이터 전송 시작:", data);
    const jsonBody = JSON.stringify(data);
    console.log("📤 전송할 JSON:", jsonBody);
    
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ API 응답 오류:", error);
      throw new Error(error.error || error.details || "예약 저장에 실패했습니다.");
    }

    const result = await response.json();
    console.log("✅ API 응답 성공:", result);
    return result.id;
  } catch (error) {
    console.error("예약 저장 오류:", error);
    // 오류 발생 시 사용자에게 알림
    throw error;
  }
}

// 노션 API를 통한 예약 조회
export async function findReservationByNameAndPhone(
  name: string,
  phone: string
): Promise<any | null> {
  try {
    const response = await fetch("/api/reservations/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "예약 조회에 실패했습니다.");
    }

    const result = await response.json();
    return result.reservation;
  } catch (error) {
    console.error("예약 조회 오류:", error);
    return null;
  }
}

// 노션 API를 통한 예약 업데이트
export async function updateReservation(
  id: string,
  updates: Partial<ReservationFormData> & { status?: string }
): Promise<void> {
  try {
    const response = await fetch("/api/reservations/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, updates }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "예약 업데이트에 실패했습니다.");
    }
  } catch (error) {
    console.error("예약 업데이트 오류:", error);
    throw error;
  }
}

