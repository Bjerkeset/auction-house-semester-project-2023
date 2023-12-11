import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate the time difference
export const getTimeDifference = (createdDate: string): string => {
  const now = new Date();
  const created = new Date(createdDate);
  const diff = now.getTime() - created.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) return months + " month" + (months > 1 ? "s" : "");
  if (weeks > 0) return weeks + " week" + (weeks > 1 ? "s" : "");
  if (days > 0) return days + " day" + (days > 1 ? "s" : "");
  if (hours > 0) return hours + " hour" + (hours > 1 ? "s" : "");
  return minutes + " minute" + (minutes > 1 ? "s" : "");
};
