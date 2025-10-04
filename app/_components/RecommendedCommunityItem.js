import Image from "next/image";
import ExploringCommunityItem from "./ExploringCommunityItem";

/*
This will get all the recommended communities of the signed in user
*/
function RecommendedCommunityItem({ signedInUserId }) {
  //I need signed in user's id so that I can call it to api

  //If user has not signed in, it must not get this page

  //Get the list of top 10 recommended community id for the user
  const communityId = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //Dummy data

  /*
  Get these details for each community with these ids:
  1. community icon
  2. community name
  3. number of members
  4. description
  */

  const communitiesData = [
    {
      id: 1,
      icon: "/bg-1.jpg",
      name: "rust",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 2,
      icon: "/bg-1.jpg",
      name: "sdfs",
      noOfMembers: 122,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 3,
      icon: "/bg-1.jpg",
      name: "etrrtgr",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 4,
      icon: "/bg-1.jpg",
      name: "erttr",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 5,
      icon: "/bg-1.jpg",
      name: "vdfvf",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 6,
      icon: "/bg-1.jpg",
      name: "asdf",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 7,
      icon: "/bg-1.jpg",
      name: "fdsa",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 8,
      icon: "/bg-1.jpg",
      name: "esad",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 9,
      icon: "/bg-1.jpg",
      name: "casdf",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
    {
      id: 10,
      icon: "/bg-1.jpg",
      name: "fghf",
      noOfMembers: 244,
      description:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    },
  ];
  return (
    <div className="space-y-1 md:grid md:grid-cols-2 xl:grid-cols-3">
      {communitiesData.map((community) => (
        <ExploringCommunityItem key={community.id} community={community} />
      ))}
    </div>
  );
}

export default RecommendedCommunityItem;
