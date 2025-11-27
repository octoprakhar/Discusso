"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { toggleCommunityJoinAction } from "../_libs/actions";
import SmallSpinner from "./SmallSpinner";

function CommunityJoinButton({ hasUserJoined, communityId }) {
  const [isJoined, setIsJoined] = useState(hasUserJoined);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("hasUserAlreadyJoin", hasUserJoined);
      formData.append("communityId", communityId);
      const res = await toggleCommunityJoinAction(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        setIsJoined((join) => !join);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <SmallSpinner />
  ) : (
    <span className="h-6 w-6 md:h-10 md:w-10 md:text-xl" onClick={handleClick}>
      {isJoined ? "Joined" : "Join"}
    </span>
  );
}

export default CommunityJoinButton;
