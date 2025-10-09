"use client";
import SearchSuggestedItem from "./SearchSuggestedItem";

function SearchSuggestionContainer({ searchText, onSuggestionClick }) {
  //Get top 6 recommendation of content with respect to searchText
  const contentSuggestion = [
    "Hellow this this generated text",
    "React performance tricks",
    "Next.js routing guide",
    "Community design systems",
    "Karma ranking tips",
    "sdfsdfsdfsdf",
  ];

  return (
    <div className="w-full max-h-48 p-3 border-2 rounded-2xl text-lg space-y-1 overflow-y-scroll">
      {contentSuggestion.map((content, idx) => (
        <SearchSuggestedItem
          key={idx}
          text={content}
          onClick={() => onSuggestionClick(content)}
        />
      ))}
    </div>
  );
}

export default SearchSuggestionContainer;
