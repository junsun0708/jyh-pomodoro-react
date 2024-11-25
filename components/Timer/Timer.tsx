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
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="text-2xl font-medium text-gray-600">
        {mode === 'work' ? '작업 시간' : mode === 'break' ? '휴식 시간' : '긴 휴식 시간'}
      </div>

      <div className="relative">
        <div className="w-72 h-72 rounded-full border-8 border-gray-100 flex items-center justify-center">
          <div className="text-7xl font-mono font-bold text-gray-800 tracking-wider">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-sm">
          <span className="text-sm font-medium text-gray-600">
            {completedSessions}/4 세션
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
            isRunning
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          {isRunning ? '일시정지' : '시작'}
        </button>
        
        <button
          onClick={skipTimer}
          className="px-8 py-3 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
        >
          넘기기
        </button>
        
        <button
          onClick={resetTimer}
          className="px-8 py-3 rounded-xl font-medium bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
        >
          리셋
        </button>
      </div>
    </div>
  );
} 