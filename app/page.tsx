import dynamic from "next/dynamic";
import Link from "next/link";

// LocationMap을 동적 import로 로드 (SSR 방지)
const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 상단 여백 추가 */}
      <div className="h-32 md:h-48"></div>

      {/* 히어로 섹션과 예약하기 CTA를 위아래로 배치 */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-8 items-center">
            {/* 위: 히어로 섹션 */}
            <div className="text-center relative z-10 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                면역공방
              </h1>
              <div className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg inline-block mb-8 text-lg shadow-lg">
                🎉 첫 방문 50% 할인 🎉
              </div>
              <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed drop-shadow-md">
                마인드 회원만을 위한 특별한 면역공방 서비스!!
              </p>
              <p className="text-lg md:text-xl text-white mb-4 leading-relaxed drop-shadow-md">
                전문적인 면역 관리 프로그램으로 건강한 하루를 시작하게요
              </p>
            </div>

            {/* 아래: 예약하기 CTA 섹션 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative z-10 w-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                지금 바로 예약하세요
              </h2>
              <p className="text-gray-600 mb-6">
                간단한 정보 입력만으로 면역 스파/처치를 예약할 수 있습니다.
              </p>
              <p className="text-gray-600 mb-8">
                첫 방문 고객님께는 50% 할인 혜택을 드립니다.
              </p>
              <Link
                href="/reservation"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
              >
                예약하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 위치 정보 (맨 아래로 이동) */}
      <LocationMap />
    </main>
  );
}

