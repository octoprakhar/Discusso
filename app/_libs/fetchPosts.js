async function fetchPosts({ pageParam = 0, limit = 5 }) {
  const formData = new FormData();
  formData.append("offset", pageParam);
  formData.append("limit", limit);

  const res = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  console.log("FetchPosts.js : Got json as", json);
  if (!json.success) {
    throw new Error(json.error || "Failed to fetch");
  }

  return json;
}

export default fetchPosts;
