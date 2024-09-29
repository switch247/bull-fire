import React from "react";
import { Flame } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-10 text-center py-6 px-6 flex justify-between items-center">
      <div className="flex justify-center mb-2">
        <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-2xl animate-pulse">
          <Flame className="w-12 h-12 text-white" />
        </div>
      </div>
      <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
        BullFire
      </h1>
      <p className="text-xl text-slate-300 mt-4 font-light tracking-wide">
        Enterprise Queue Dashboard
      </p>
    </header>
  );
}
