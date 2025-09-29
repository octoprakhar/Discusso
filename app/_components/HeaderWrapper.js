"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const router = useRouter();

  const handleAddPostClick = () => {
    router.push("/user/create-post");
  };

  return <Header onAddPostClick={handleAddPostClick} />;
}
