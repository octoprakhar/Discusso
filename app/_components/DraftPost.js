"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSetQueryParams } from "../_hooks/useSetQueryParams";
import toast from "react-hot-toast";

function DraftPost({ draft }) {
  const { setQueryParam } = useSetQueryParams("/user/create-post");

  const handleDeleteDraft = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //Get result by sending the server action and get the result
    const success = true;
    if (success) {
      toast.success("Successfully deleted the draft!");
    } else {
      toast.error("Problem occured while deleting draft.");
    }
  };
  return (
    <div
      onClick={() => {
        setQueryParam("draftId", draft.id);
      }}
      className="flex justify-between items-center w-[95%] md:w-[85%] mx-auto border-[1px] rounded-2xl px-2 py-1 md:px-4 md:py-2 bg-slate-50 hover:bg-slate-300 cursor-pointer"
    >
      <div>
        <div>
          <span className="font-bold md:text-2xl">Editing : </span>
          <span className="md:text-2xl">{draft.title}</span>
        </div>
        <div className="text-xs md:text-base">
          <span>{draft.selectedCommunity} : </span>
          <span>
            Edited <strong className="font-bold">{draft.lastEditedAt}</strong>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex justify-center items-center p-2 rounded-full hover:bg-slate-400 cursor-pointer">
          <PencilIcon className="h-6 w-6 md:h-10 md:w-10" />
        </div>
        <div className="flex justify-center items-center p-2 rounded-full hover:bg-slate-400 cursor-pointer">
          <TrashIcon
            className="h-6 w-6 md:h-10 md:w-10"
            onClick={handleDeleteDraft}
          />
        </div>
      </div>
    </div>
  );
}

export default DraftPost;
