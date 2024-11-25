import Timer from '@/components/Timer/Timer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-2xl p-12 rounded-3xl shadow-lg bg-gradient-to-br from-white to-gray-50">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          포모도로 타이머
        </h1>
        <Timer />
      </div>
    </main>
  );
}
