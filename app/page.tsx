import Timer from '@/components/Timer/Timer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">포모도로 타이머</h1>
        <Timer />
      </div>
    </main>
  );
}
