"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SaveAsDraftButton() {
  const router = useRouter();
  const handleSaveAsDraft = () => {
    //Send server action and get the result as success or failure
    const success = true;
    if (success) {
      toast.success("Successfully saved post as draft!");
      router.push("/user/drafts");
    } else {
      toast.error("Error while saving the draft.");
      router.push("/user/drafts");
    }
  };
  return (
    <button
      className="px-2 py-1 rounded-xl md:text-3xl border-[1px] cursor-pointer hover:bg-slate-200 hover:border-none"
      onClick={handleSaveAsDraft}
    >
      Save as Draft
    </button>
  );
}

export default SaveAsDraftButton;
