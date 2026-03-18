const baseUrl = process.env.ML_URL || "http://fastapi-backend:8000";
export async function triggerTagGeneration({ postId, title, description }) {
  fetch(`${baseUrl}/tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.ML_INTERNAL_SECRET || "placeholder",
    },
    body: JSON.stringify({
      post_id: postId,
      title,
      description,
    }),
  }).catch((err) => {
    console.error("ML tagging failed to start:", err);
  });
}

export async function triggerPostQuality({ postId, karma, title, body }) {
  fetch(`${baseUrl}/post-quality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.ML_INTERNAL_SECRET || "placeholder",
    },
    body: JSON.stringify({
      postId,
      karma,
      title,
      body,
    }),
  }).catch((err) => {
    console.error("ML post quality failed to start:", err);
  });
}
