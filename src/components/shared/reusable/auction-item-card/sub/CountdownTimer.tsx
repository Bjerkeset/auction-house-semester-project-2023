"use client";
import {useState, useEffect} from "react";

type CountdownTimerProps = {
  endsAt: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountdownTimer({endsAt}: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(endsAt) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null;
  };

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Checking if timeLeft is not null before rendering the countdown
  return (
    <div>
      {timeLeft === null ? (
        <span>Time's up!</span>
      ) : (
        <div className="flex gap-1">
          {Object.entries(timeLeft).map(([interval, value]) => (
            <div
              key={interval}
              className="flex p-2 w-1/4 flex-col justify-center items-center"
            >
              <time>
                <span className="">{formatTime(value)}</span>
                <span className="text-muted-foreground text-sm">
                  {interval.charAt(0).toUpperCase() + interval.slice(1)}
                </span>
              </time>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
