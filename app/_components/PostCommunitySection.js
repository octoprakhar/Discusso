import { DocumentPlusIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { formatToReadableDate } from "../utils/dateTimeUtils";
import JoinCommunityButton from "./JoinCommunityButton";

async function PostCommunitySection({ community }) {
  return (
    <div className="mt-10 md:mt-0 w-[80vw] lg:w-[20vw] lg:h-fit p-2 mx-auto bg-slate-100 rounded-xl space-y-4">
      <div className="flex justify-between items-center font-bold">
        <p className="text-xl">{community.communityName}</p>
        <JoinCommunityButton
          hasUserAlreadyJoin={community.hasUserJoinedCommunity}
          id={community.communityId}
        />
      </div>
      <div className="space-y-1">
        <p className="font-bold text-lg">{community.title}</p>
        <p>{community.description}</p>
      </div>
      <div className="space-y-1">
        <div className="flex gap-2">
          <DocumentPlusIcon className="w-6 h-6" />
          <span>Created {formatToReadableDate(community.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <GlobeAltIcon className="w-6 h-6" />
          <span>Public</span>
        </div>
      </div>
      <div>
        <p className="font-bold text-lg">{community.totalCommunityMembers}</p>
        <p>Members</p>
      </div>
    </div>
  );
}

export default PostCommunitySection;
