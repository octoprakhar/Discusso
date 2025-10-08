"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSidebar } from "../context/MainSideBarContext";

function MainSideBar() {
  const { open, closeSiderbar } = useSidebar();

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeSiderbar();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeSiderbar]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeSiderbar}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={closeSiderbar}
            className="p-2 rounded hover:bg-slate-100 focus:outline-none focus:ring"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="p-4 space-y-2">
          <Link
            className="block p-2 rounded hover:bg-slate-100"
            href="/"
            onClick={closeSiderbar}
          >
            Home
          </Link>
          <Link
            className="block p-2 rounded hover:bg-slate-100"
            href="/popular"
            onClick={closeSiderbar}
          >
            Popular
          </Link>
          <Link
            className="block p-2 rounded hover:bg-slate-100"
            href="/explore"
            onClick={closeSiderbar}
          >
            Explore
          </Link>
          <Link
            className="block p-2 rounded hover:bg-slate-100"
            href="/search"
            onClick={closeSiderbar}
          >
            Search
          </Link>
          <Link
            className="block p-2 rounded hover:bg-slate-100"
            href="/user/create-post"
            onClick={closeSiderbar}
          >
            Create Post
          </Link>
          {/* Add more links as needed */}
        </nav>
      </aside>
    </div>
  );
}

export default MainSideBar;
