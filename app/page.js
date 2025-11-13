import MainSideBar from "./_components/MainSideBar";
import PostFeedClient from "./_components/PostFeedClient";

export default async function Home() {
  return (
    <>
      <MainSideBar />
      <PostFeedClient />
    </>
  );
}
