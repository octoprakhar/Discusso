"use client";
function SearchSuggestedItem({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-2 py-1 cursor-pointer hover:bg-slate-200"
    >
      {" "}
      <p className="">{text}</p>
      <hr />
    </div>
  );
}

export default SearchSuggestedItem;
