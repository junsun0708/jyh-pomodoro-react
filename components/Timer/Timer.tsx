'use client';

import React, { useState, useEffect } from 'react';
import { formatTime } from '@/utils/timeUtils';

type TimerMode = 'work' | 'break' | 'longBreak';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25분을 초로 변환
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
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-6xl font-mono font-bold">
        {formatTime(timeLeft)}
      </div>
      
      <div className="text-2xl font-semibold">
        {mode === 'work' ? '작업 시간' : mode === 'break' ? '휴식 시간' : '긴 휴식 시간'}
      </div>
      
      <div className="text-sm">
        완료한 세션: {completedSessions}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isRunning ? '일시정지' : '시작'}
        </button>
        
        <button
          onClick={skipTimer}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          넘기기
        </button>
        
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          리셋
        </button>
      </div>
    </div>
  );
} 