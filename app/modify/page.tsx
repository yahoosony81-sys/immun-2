"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findReservationByNameAndPhone, updateReservation } from "@/lib/api";
import dynamic from "next/dynamic";
import type { ReactDatePickerProps } from "react-datepicker";

const DatePicker = dynamic<ReactDatePickerProps>(
  () => import("react-datepicker").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function ModifyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [reservation, setReservation] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newTime, setNewTime] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    
    try {
      const found = await findReservationByNameAndPhone(name, phone);
      if (found) {
        setReservation(found);
        setNewDate(new Date(found.preferredDate));
        setNewTime(found.preferredTime);
      } else {
        setError("예약 정보를 찾을 수 없습니다. 이름과 전화번호를 확인해주세요.");
        setReservation(null);
      }
    } catch (err) {
      setError("예약 조회 중 오류가 발생했습니다.");
      setReservation(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdate = async () => {
    if (!reservation || !newDate || !newTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateReservation(reservation.id, {
        preferredDate: newDate.toISOString().split("T")[0],
        preferredTime: newTime,
      });
      alert("예약 변경 요청이 접수되었습니다. 운영자가 확인 후 연락드리겠습니다.");
      router.push("/");
    } catch (err) {
      alert("예약 변경 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (!reservation) return;
    
    if (!confirm("정말 예약을 취소하시겠습니까?")) return;

    try {
      await updateReservation(reservation.id, {
        status: "cancelled",
      } as any);
      alert("예약 취소 요청이 접수되었습니다.");
      router.push("/");
    } catch (err) {
      alert("예약 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">예약 변경</h1>

          {!reservation ? (
            <form onSubmit={handleSearch} className="space-y-6">
              <p className="text-gray-600 mb-6">
                예약 변경을 위해 이름과 전화번호를 입력해주세요.
              </p>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="010-1234-5678"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors"
              >
                {isSearching ? "조회 중..." : "예약 조회"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  현재 예약 정보
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p><strong>이름:</strong> {reservation.name}</p>
                  <p><strong>이메일:</strong> {reservation.email}</p>
                  <p><strong>전화번호:</strong> {reservation.phone}</p>
                  <p><strong>예약 날짜:</strong> {reservation.preferredDate}</p>
                  <p><strong>예약 시간:</strong> {reservation.preferredTime}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  변경할 정보
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      새로운 희망 날짜 *
                    </label>
                    <DatePicker
                      selected={newDate}
                      onChange={(date) => setNewDate(date)}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                      onFocus={(e) => e.target.blur()}
                      onInputClick={() => {}}
                    />
                  </div>

                  <div>
                    <label htmlFor="newTime" className="block text-sm font-medium text-gray-700 mb-2">
                      새로운 희망 시간 *
                    </label>
                    <select
                      id="newTime"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">시간을 선택하세요</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating || !newDate || !newTime}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  {isUpdating ? "변경 중..." : "예약 변경 요청"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  예약 취소 요청
                </button>
              </div>

              <p className="text-sm text-gray-600 text-center">
                예약 변경 및 취소 요청은 운영자가 확인 후 처리됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

