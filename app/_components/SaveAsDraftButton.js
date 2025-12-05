"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreatePostContext } from "../context/PostContext";
import { insertNewDraftAction } from "../_libs/actions";

function SaveAsDraftButton() {
  const router = useRouter();
  const { title, body, communityId } = useCreatePostContext();
  const handleSaveAsDraft = async () => {
    //Send server action and get the result as success or failure
    console.log(
      `Got title as: ${title}, Got body as ${body}, Got community id as ${communityId} `
    );
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("communityId", communityId);
    const res = await insertNewDraftAction(formData);
    const success = res.success ? true : false;
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
