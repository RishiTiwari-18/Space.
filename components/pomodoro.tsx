"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { Minus, Plus } from "lucide-react";
import { usePomodoro } from "@/contexts/PomodoroContext";

export default function Pomodoro() {
  const {
    duration,
    secondsLeft,
    isRunning,
    minutes,
    seconds,
    handleStart,
    handlePause,
    handleReset,
    handleDurationChange,
  } = usePomodoro();

  return (
    <Card
      className="w-full flex flex-col gap-4"
      aria-label="Pomodoro Timer Card"
    >
      <CardHeader>
        <h2  id="pomodoro-timer-title">
          Focus Timer
        </h2>
      </CardHeader>
      <CardContent
        className="flex h-full flex-col items-center justify-center"
        aria-labelledby="pomodoro-timer-title"
      >
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="text-6xl tabular-nums cursor-pointer select-none"
              title="Adjust timer"
              aria-label={`Current timer: ${minutes} minutes and ${seconds} seconds. Click to adjust.`}
              type="button"
            >
              <time dateTime={`PT${minutes}M${seconds}S`} aria-live="polite">
                {minutes}:{seconds}
              </time>
            </button>
          </SheetTrigger>
          <SheetContent
            className="flex flex-col items-center py-6"
            side="bottom"
            aria-modal="true"
            aria-labelledby="set-timer-duration-title"
          >
            <SheetHeader>
              <SheetTitle id="set-timer-duration-title">
                Set Timer Duration
              </SheetTitle>
            </SheetHeader>
            <div className="flex items-center w-full max-w-lg justify-center space-x-2 py-6">
              {/* Decrement by 5 min */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(-5)}
                disabled={duration <= 5}
                aria-label="Decrease timer duration by 5 minutes"
              >
                {/* <Minus aria-hidden="true" /> */}
                <span className="sr-only">Decrease by 5</span>
                <span aria-hidden="true" className="text-xs font-bold ml-0.5">5</span>
              </Button>
              {/* Decrement by 1 min */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(-1)}
                disabled={duration <= 1}
                aria-label="Decrease timer duration by 1 minute"
              >
                <Minus aria-hidden="true" />
                <span className="sr-only">Decrease by 1</span>
              </Button>
              <div className="flex-1 text-center">
                <div
                  className="text-5xl font-bold tracking-tighter"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {duration}
                </div>
                <div className="text-muted-foreground text-xs uppercase">
                  Minutes
                </div>
              </div>
              {/* Increment by 1 min */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(1)}
                disabled={duration >= 60}
                aria-label="Increase timer duration by 1 minute"
              >
                <Plus aria-hidden="true" />
                <span className="sr-only">Increase by 1</span>
              </Button>
              {/* Increment by 5 min */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(5)}
                disabled={duration >= 60}
                aria-label="Increase timer duration by 5 minutes"
              >
                {/* <Plus aria-hidden="true" /> */}
                <span className="sr-only">Increase by 5</span>
                <span aria-hidden="true" className="text-xs font-bold ml-0.5">5</span>
              </Button>
            </div>
            <SheetFooter className="max-w-lg">
              <SheetClose asChild>
                <Button variant="outline" aria-label="Close timer settings">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <nav
          className="flex gap-2 mt-4"
          aria-label="Pomodoro timer controls"
        >
          <Button
            onClick={handleStart}
            disabled={isRunning || secondsLeft === 0}
            aria-label="Start Pomodoro timer"
          >
            Start
          </Button>
          <Button
            onClick={handlePause}
            disabled={!isRunning}
            aria-label="Pause Pomodoro timer"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            aria-label="Reset Pomodoro timer"
          >
            Reset
          </Button>
        </nav>
        <p className="sr-only" aria-live="polite">
          {isRunning
            ? `Timer running: ${minutes} minutes and ${seconds} seconds left.`
            : secondsLeft === 0
            ? "Timer finished."
            : "Timer paused."}
        </p>
      </CardContent>
    </Card>
  );
}
