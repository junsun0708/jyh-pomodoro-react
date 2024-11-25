import Timer from '@/components/Timer/Timer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-cyan-300">
      <div className="flex flex-col items-center justify-center gap-8">
        <Timer />
      </div>
    </main>
  );
}
