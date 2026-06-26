import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Merges Tailwind classes dynamically avoiding duplicates or style conflicts
  return twMerge(clsx(inputs))
}