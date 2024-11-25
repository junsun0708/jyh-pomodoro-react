'use client';

import React, { useState, useEffect } from 'react';
import { formatTime } from '@/utils/timeUtils';

type TimerMode = 'work' | 'break' | 'longBreak';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    if (mode === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(30 * 60); // 30분 휴식
      } else {
        setMode('break');
        setTimeLeft(5 * 60); // 5분 휴식
      }
    } else {
      setMode('work');
      setTimeLeft(25 * 60); // 25분 작업
    }
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const skipTimer = () => {
    handleTimerComplete();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setMode('work');
    setCompletedSessions(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="relative">
        <div className="absolute inset-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/50"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 30}deg) translateY(-140px) translateX(-50%)`,
              }}
            />
          ))}
        </div>
        
        <div className="text-8xl font-mono text-white font-light tracking-wider">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={toggleTimer}
          className="px-12 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition-all"
        >
          {isRunning ? '일시정지' : '시작하기'}
        </button>

        <div className="fixed bottom-8 left-0 right-0">
          <div className="flex justify-center gap-16 text-white/80">
            <button className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl">self_improvement</span>
              <span className="text-xs">명상모드</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl">timer</span>
              <span className="text-xs">타이머모드</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl">calendar_today</span>
              <span className="text-xs">진행기록</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl">music_note</span>
              <span className="text-xs">음악재생</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 