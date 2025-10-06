"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetQueryParams(customPathName = "") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(
      `${customPathName ? customPathName : pathname}?${params.toString()}`,
      { scroll: false }
    );
  };

  return { setQueryParam };
}
