"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

function TextBackgroundButton({ text, urlParamKey = "feeds" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const feed = searchParams.get("feeds");
  const isActive = feed === text.toLowerCase();
  const handleUrlSetting = () => {
    // Get current params
    const params = new URLSearchParams(searchParams.toString());

    // Set or update query param
    params.set(urlParamKey, text.toLowerCase());

    // Push the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`p-2 font-bold hover:underline cursor-pointer hover:bg-slate-400 rounded-xl md:text-2xl ${
        isActive ? "bg-slate-400" : ""
      }`}
      onClick={handleUrlSetting}
    >
      {text}
    </div>
  );
}

export default TextBackgroundButton;
