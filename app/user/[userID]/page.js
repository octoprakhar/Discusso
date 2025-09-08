async function page({ params }) {
  const param = await params;
  const userId = param.userID;
  return <div>{userId}</div>;
}

export default page;
