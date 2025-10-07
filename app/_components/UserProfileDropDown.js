"use client";

import { useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useProfileDropDown } from "../context/ProfileDropDownMenu";
import Link from "next/link";

function UserProfileDropDown() {
  const { open, toggleDropDown, closeDropDown } = useProfileDropDown();
  const menuRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeDropDown();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeDropDown]);

  // Close on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeDropDown();
      }
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, closeDropDown]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <UserCircleIcon
        onClick={toggleDropDown}
        className="h-6 w-6 md:h-12 md:w-12 2xl:h-8 2xl:w-8 cursor-pointer hover:bg-slate-300 rounded-lg"
      />

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
          <Link
            href="/user/myProfile"
            className="block px-4 py-2 hover:bg-slate-100"
            onClick={closeDropDown}
          >
            My Profile
          </Link>
          <Link
            href="/user/myPosts"
            className="block px-4 py-2 hover:bg-slate-100"
            onClick={closeDropDown}
          >
            My Posts
          </Link>
          <Link
            href="/user/saved"
            className="block px-4 py-2 hover:bg-slate-100"
            onClick={closeDropDown}
          >
            Saved Posts
          </Link>
          <Link
            href="/user/drafts"
            className="block px-4 py-2 hover:bg-slate-100"
            onClick={closeDropDown}
          >
            Drafts
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-slate-100"
            onClick={closeDropDown}
          >
            Settings
          </Link>
          <button
            className="w-full text-left block px-4 py-2 hover:bg-slate-100"
            onClick={() => {
              closeDropDown();
              // add your logout logic here
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfileDropDown;
