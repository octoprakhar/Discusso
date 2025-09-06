"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSidebar } from "../context/MainSideBarContext";

function SidebarButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-1 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring cursor-pointer"
      aria-label="Open sidebar"
    >
      <Bars3Icon className="h-6 w-6 md:h-8 md:w-8" />
    </button>
  );
}

export default SidebarButton;
