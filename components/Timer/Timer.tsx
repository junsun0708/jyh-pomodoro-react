'use client';

import React, { useState, useEffect } from 'react';

type TimerMode = 'work' | 'break' | 'longBreak';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(30 * 60);
      } else {
        setMode('break');
        setTimeLeft(5 * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(25 * 60);
    }
    setIsRunning(false);
  };

  // 시간을 개별 숫자로 분리
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* 타이머 디스플레이 */}
      <div className="flex flex-row justify-center items-center gap-4 mb-8">
        {/* 분 */}
        <div className="flex gap-2">
          <div className="flip-card">
            {Math.floor(minutes / 10)}
          </div>
          <div className="flip-card">
            {minutes % 10}
          </div>
        </div>
        {/* 초 */}
        <div className="flex gap-2">
          <div className="flip-card">
            {Math.floor(seconds / 10)}
          </div>
          <div className="flip-card">
            {seconds % 10}
          </div>
        </div>
      </div>

      {/* 세션 카운터 */}
      <div className="text-white text-sm mb-8 text-center">
        {sessions}/4
      </div>

      {/* 재생/일시정지 버튼 */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-12
          hover:bg-white/30 transition-all duration-200"
      >
        <span className="material-icons text-white text-3xl">
          {isRunning ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-8 left-0 right-0">
        <div className="flex justify-center gap-16 text-white">
          <button className="flex flex-col items-center gap-1 hover:text-white/90 transition-colors">
            <span className="material-icons text-2xl">self_improvement</span>
            <span className="text-[10px]">명상모드</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-white/90 transition-colors">
            <span className="material-icons text-2xl">timer</span>
            <span className="text-[10px]">타이머모드</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-white/90 transition-colors">
            <span className="material-icons text-2xl">calendar_today</span>
            <span className="text-[10px]">진행기록</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-white/90 transition-colors">
            <span className="material-icons text-2xl">music_note</span>
            <span className="text-[10px]">음악재생</span>
          </button>
        </div>
      </div>
    </div>
  );
} 