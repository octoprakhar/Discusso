"use client";
import { useEffect, useState } from "react";
import { getSearchSuggestionsAction } from "../_libs/actions";
import SearchSuggestedItem from "./SearchSuggestedItem";
import toast from "react-hot-toast";

function SearchSuggestionContainer({ searchText }) {
  //Get top 6 recommendation of content with respect to searchText

  // const [newSearchText, setNewSearchText] = useState(searchText);
  const [postSuggestion, setPostSuggestion] = useState([]);
  const [communitySuggestion, setCommunitySuggestion] = useState([]);

  useEffect(() => {
    const fetchSuggestion = async () => {
      const formData = new FormData();
      formData.append("searchText", searchText);
      const res = await getSearchSuggestionsAction(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        setPostSuggestion(res.posts);
        setCommunitySuggestion(res.communities);
      }
    };

    fetchSuggestion();
  }, [searchText]);

  // const contentSuggestion = [
  //   "Hellow this this generated text",
  //   "React performance tricks",
  //   "Next.js routing guide",
  //   "Community design systems",
  //   "Karma ranking tips",
  //   "sdfsdfsdfsdf",
  // ];

  return (
    <div className="w-full max-h-48 p-3 border-2 rounded-2xl text-lg space-y-1 overflow-y-scroll">
      <h3 className="font-bold">Posts Suggestion</h3>
      {postSuggestion.map((content, idx) => (
        <SearchSuggestedItem
          key={idx}
          suggestion={content}
          suggestionType="post"
          // onClick={() => onSuggestionClick(content)}
        />
      ))}
      <h3 className="font-bold">Communities Suggestion</h3>
      {communitySuggestion.map((content, idx) => (
        <SearchSuggestedItem
          key={idx}
          suggestion={content}
          suggestionType="community"
          // onClick={() => onSuggestionClick(content)}
        />
      ))}
    </div>
  );
}

export default SearchSuggestionContainer;
