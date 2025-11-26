export default function HeroSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center relative z-10">
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
    </section>
  );
}

