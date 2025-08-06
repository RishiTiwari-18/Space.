
"use client"

import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";


type PomodoroContextType = {
  duration: number;
  secondsLeft: number;
  isRunning: boolean;
  minutes: string;
  seconds: string;
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
  handleDurationChange: (change: number) => void;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const [duration, setDuration] = useState(25); // in minutes
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isRunning) setSecondsLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 0) return prev - 1;
          setIsRunning(false);
          // Play sound when timer completes
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          return 0;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const handleStart = () => {
    if (secondsLeft > 0) setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(duration * 60);
  };

  const handleDurationChange = (change: number) => {
    setDuration((prev) => {
      const next = Math.max(1, Math.min(60, prev + change));
      return next;
    });
  };

  const value: PomodoroContextType = {
    duration,
    secondsLeft,
    isRunning,
    minutes,
    seconds,
    handleStart,
    handlePause,
    handleReset,
    handleDurationChange,
    intervalRef,
    audioRef, 
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src="/audio/complete.mp3" preload="auto" />
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};
