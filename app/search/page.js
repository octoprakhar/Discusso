import EnlargedSearchBar from "../_components/EnlargedSearchBar";

export default function Page() {
  /*
  In this page, there will be a search field. And also some suggestions that will be generated using some things.
  THey are:
  1. There will be three types of suggestionss: content suggestion, community suggestion, user-suggestion
  2. Content suggestion:
    - These are the top 5 suggestion that will be based on most relevant existing post contents match with user's typed text.
  3. Community suggestion:
    - THe suggestion that search for all communities with this name, and shows the top 3 most popular ones.
  4. User-suggestions:
    - The sugegstion about user with most karmas.
  */
  return (
    <div className="w-[90%] mx-auto px-2 py-6 space-y-2">
      <EnlargedSearchBar />
    </div>
  );
}
