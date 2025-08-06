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
    <Card className="w-full flex flex-col gap-4">
      <CardHeader className="">Focus Time</CardHeader>
      <CardContent className="flex h-full flex-col items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="text-6xl tabular-nums cursor-pointer select-none" title="Adjust timer">
              {minutes}:{seconds}
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center py-6" side="bottom">
            <SheetHeader>
              <SheetTitle>Set Timer Duration</SheetTitle>
            </SheetHeader>
            <div className="flex items-center w-full  max-w-lg justify-center space-x-2 py-6">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(-1)}
                disabled={duration <= 1}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-5xl font-bold tracking-tighter">{duration}</div>
                <div className="text-muted-foreground text-xs uppercase">Minutes</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDurationChange(1)}
                disabled={duration >= 60}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <SheetFooter className="max-w-lg">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleStart}
            disabled={isRunning || secondsLeft === 0}
          >
            Start
          </Button>
          <Button onClick={handlePause} disabled={!isRunning}>
            Pause
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
