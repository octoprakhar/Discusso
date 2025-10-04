import ExploringCommunityItem from "./ExploringCommunityItem";

function CommunityRecommendationByLocation({ userLocation }) {
  //Get all top trending communities of the signed in user's country

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
  ];

  return (
    <div className="space-y-1 md:grid md:grid-cols-2 xl:grid-cols-3">
      {communitiesData.map((community) => (
        <ExploringCommunityItem key={community.id} community={community} />
      ))}
    </div>
  );
}

export default CommunityRecommendationByLocation;
