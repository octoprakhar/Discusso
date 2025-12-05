//The main reaason I made it was to give details to draft feature.

"use client";
const { createContext, useState, useContext, useEffect } = require("react");

const PostContext = createContext(null);

export function CreatePost({
  children,
  draftTitle = "",
  draftBody = "",
  draftedCommunityId = -1,
  communityList,
  draftedCommunity = "",
  communityId = "",
  draftedCommunityImage = "",
}) {
  const [title, setTitle] = useState(draftTitle);
  const [body, setBody] = useState(draftBody);
  const [links, setLinks] = useState([]);
  const [keyLink, setKeyLink] = useState("");
  const [valueLink, setValueLink] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(
    draftedCommunityId && draftedCommunityId !== -1 ? draftedCommunityId : null
  );

  const [filteredCommunity, setFilteredCommunity] = useState(communityList);
  const [toShowInput, setToShowInput] = useState(false);
  const isUserJoinedThatCommunity = communityList.find(
    (com) => com.communityId === communityId
  );

  const [inputCommunityName, setInputCommunityName] = useState(
    draftedCommunity || isUserJoinedThatCommunity?.name || ""
  );
  const [selectedCommunityImage, setSelectedCommunityImage] = useState(
    draftedCommunityImage || ""
  );

  useEffect(() => {
    setTitle(draftTitle);
    setBody(draftBody);
    setSelectedCommunityId(
      draftedCommunityId && draftedCommunityId !== -1
        ? draftedCommunityId
        : null
    );
    setInputCommunityName(draftedCommunity);
    setSelectedCommunityImage(draftedCommunityImage);
  }, [
    draftTitle,
    draftBody,
    draftedCommunityId,
    draftedCommunity,
    draftedCommunityImage,
  ]);

  return (
    <PostContext.Provider
      value={{
        title,
        setTitle,
        body,
        setBody,
        links,
        setLinks,
        keyLink,
        setKeyLink,
        valueLink,
        setValueLink,
        mediaFiles,
        setMediaFiles,
        isLoading,
        setIsLoading,
        selectedCommunityId,
        setSelectedCommunityId,
        communityList,
        draftedCommunity,
        communityId,
        draftTitle,
        filteredCommunity,
        setFilteredCommunity,
        toShowInput,
        setToShowInput,
        inputCommunityName,
        setInputCommunityName,
        selectedCommunityImage,
        setSelectedCommunityImage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function useCreatePostContext() {
  const ctx = useContext(PostContext);
  if (!ctx)
    throw new Error("useCreatePostContext must be used within <CreatePost>");
  return ctx;
}
