import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const LAMPORTS_PER_SOL = 1_000_000_000;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


 export const formatBalance = (balance: number): string => {
    return `${(balance / LAMPORTS_PER_SOL)}`
  }
