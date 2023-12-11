"use client";
import {useState, useEffect} from "react";

type CountdownTimerProps = {
  endsAt: string;
};

type TimeLeft = {
  Days: number;
  Hours: number;
  Minutes: number;
  Seconds: number;
};

export default function CountdownTimer({endsAt}: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(endsAt) - +new Date();

    if (difference > 0) {
      return {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
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

  // Modified getTimeLabel function
  const getTimeLabel = (interval: string, value: number) => {
    const singleLetterLabel = interval[0]; // First letter of the interval
    const fullLabel = value === 1 ? interval.slice(0, -1) : interval;

    return (
      <>
        {/* Full label for md screens and above */}
        <span className="md:inline hidden">{fullLabel}</span>
        {/* Single letter label for screens smaller than md */}
        <span className="md:hidden">{singleLetterLabel}</span>
      </>
    );
  };

  // Render countdown only if the time value is greater than 0
  return (
    <div>
      {timeLeft === null ? (
        <span>Times up!</span>
      ) : (
        <div className="flex gap-2">
          {Object.entries(timeLeft).map(
            ([interval, value]) =>
              value > 0 && (
                <div
                  key={interval}
                  className="flex p-2 w-1/4 flex-col justify-center items-center"
                >
                  <time className="flex items-center">
                    <span className="px-1 ">{formatTime(value)}</span>
                    <span className="text-muted-foreground text-sm">
                      {getTimeLabel(interval, value)}
                    </span>
                  </time>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
