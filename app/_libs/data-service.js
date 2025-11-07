import { supabase } from "./supabase";

export async function findUserByEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No user found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user by email");
  }

  return data;
}

export async function insertNewUser(query) {
  const { data, error } = await supabase.from("User").insert([query]).select();

  if (error) {
    console.error(error);
    throw new Error("Error while registering user");
  }

  return data;
}

export async function findRefreshTokenByEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("refreshToken")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No token found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user by email");
  }

  return data;
}

export async function findUserIdbyEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No userId found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user.");
  }

  return data.id;
}

export async function saveOrUpdateRefreshToken(email, token) {
  const { data, error } = await supabase
    .from("User")
    .update({ refreshToken: token })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while registering user");
  }

  return data;
}

export async function updateUserLocation(email, userLocation) {
  const { data, error } = await supabase
    .from("User")
    .update({ userLocation: userLocation })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while updating user's location");
  }

  return data;
}

export async function uploadPostImages(image) {
  try {
    if (!image || !image.name) {
      throw new Error("Invalid image file");
    }

    //Defining a unique filename to avoid overwrites
    const filePath = `images/${Date.now()}_${image.name}`;

    // Uploading file to supabase
    const { data, error } = await supabase.storage
      .from("Posts")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
      throw new Error("Something went wrong. Please try again later.");
    }

    //Getting a public URL for the uploaded file
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("Posts")
      .getPublicUrl(data.path);

    if (publicUrlError) {
      console.error("Fetching uploaded image failed:", publicUrlError);
      throw new Error("Something went wrong. Please try again later.");
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err.message);
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function getAllPosts() {
  let { data: Post, error } = await supabase.from("Post").select("*");

  if (error) {
    console.error("Posts fetching failed:", error);
    throw new Error("Something went wrong. Please try again later.");
  }

  return Post;
}

export async function insertPost(post) {
  const { data, error } = await supabase
    .from("Post")
    .insert([{ ...post }])
    .select();

  if (error) {
    console.error("Insertion failed:", error);
    throw new Error("Something went wrong. Please try again later.");
  }

  return data;
}
