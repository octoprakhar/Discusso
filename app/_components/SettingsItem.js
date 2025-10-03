"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Card } from "./Card";

function SettingsItem({
  id,
  handleClick,
  title,
  value = "",
  description = "",
}) {
  // const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className="group flex items-center justify-between px-2 py-1 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <div>
        <p>{title}</p>
        {description && <p className="text-xs">{description}</p>}
      </div>
      <div className="flex gap-2 items-center">
        <p>{value}</p>
        <div className="p-2 cursor-pointer group-hover:bg-slate-400 rounded-full">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default SettingsItem;
