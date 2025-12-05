import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import SavedPostFeedClient from "@/app/_components/SavedPostFeedClient";

export const dynamic = "force-dynamic";

export default function Page() {
  //Get all the saved post from the user

  return <SavedPostFeedClient />;
}
