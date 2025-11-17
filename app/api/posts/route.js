import { getAllPostsAction } from "@/app/_libs/actions";

export async function POST(req) {
  //   console.log(`🧐 posts route is called with req: ${req}`);
  const formData = await req.formData();
  const result = await getAllPostsAction(formData);

  return Response.json(result);
}
