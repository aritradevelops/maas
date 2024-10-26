import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScopeQuery(scope: 'all' | 'owner', owner_id: string) {
  return scope === 'all' ? {} : { owner_id }
}

