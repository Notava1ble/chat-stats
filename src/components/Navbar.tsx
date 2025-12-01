"use client";

import { MessageSquare, ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-primary/80 top-0 z-100 w-full border-b px-8 py-6 text-white backdrop-blur-md">
      <div className="mx-auto flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-10" />
          <div>
            <h1 className="text-xl font-medium sm:text-xl md:text-2xl lg:text-3xl">
              Chat Stats
            </h1>
            <p className="text-muted text-sm">Offline WhatsApp Analyzer</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <ShieldCheck />
          <p>Your data never leaves the device</p>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
