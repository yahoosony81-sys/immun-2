import { ReservationFormData } from "@/types/reservation";

// 간단한 로컬 스토리지 기반 저장 (실제로는 서버 API나 Supabase 등을 사용해야 함)
export async function saveReservation(data: ReservationFormData): Promise<string> {
  // 로컬 스토리지에 저장 (실제 프로덕션에서는 서버 API 호출)
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  const newReservation = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  reservations.push(newReservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  
  // 실제로는 서버에 POST 요청을 보내야 함
  // 예: await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(data) })
  
  return newReservation.id;
}

export async function findReservationByNameAndPhone(
  name: string,
  phone: string
): Promise<any | null> {
  // 로컬 스토리지에서 조회 (실제 프로덕션에서는 서버 API 호출)
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  const reservation = reservations.find(
    (r: any) => r.name === name && r.phone === phone
  );
  
  return reservation || null;
}

export async function updateReservation(
  id: string,
  updates: Partial<ReservationFormData>
): Promise<void> {
  // 로컬 스토리지에서 업데이트 (실제 프로덕션에서는 서버 API 호출)
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  const index = reservations.findIndex((r: any) => r.id === id);
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...updates };
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }
}

