import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as whatsapp from "whatsapp-chat-parser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseChatFile(fileContent: string) {
  const messages = whatsapp.parseString(fileContent);
  return messages;
}
