import { getSavedPostsAction } from "@/app/_libs/actions";

export async function POST() {
  const result = await getSavedPostsAction();
  return Response.json(result);
}
