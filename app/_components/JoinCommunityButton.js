"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { toggleCommunityJoinAction } from "../_libs/actions";
import SmallSpinner from "./SmallSpinner";

function JoinCommunityButton({ hasUserAlreadyJoin, id }) {
  const [isMember, setIsMember] = useState(hasUserAlreadyJoin);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;

    const previous = isMember;
    setIsMember(!isMember);
    setLoading(true);

    const formData = new FormData();
    formData.append("hasUserAlreadyJoin", previous ? "true" : "false");
    formData.append("communityId", id);

    const res = await toggleCommunityJoinAction(formData);

    if (!res?.success) {
      // rollback state
      setIsMember(previous);
      toast.error(res.error || "Could not update");
    }

    setLoading(false);
  };

  return (
    <button
      disabled={loading}
      className={`px-4 py-1 border rounded-2xl border-slate-400 ${
        isMember
          ? "text-slate-50 bg-slate-800 hover:bg-slate-600"
          : "text-slate-700 hover:border-slate-700"
      } text-xl cursor-pointer`}
      onClick={handleToggle}
    >
      {loading ? (
        <SmallSpinner color="border-sky-400" />
      ) : isMember ? (
        "Joined"
      ) : (
        "Join"
      )}
    </button>
  );
}

export default JoinCommunityButton;
