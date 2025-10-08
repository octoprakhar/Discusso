"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateCommunityForm() {
  const router = useRouter();
  const [communityName, setCommunityName] = useState("");
  const [communityTitle, setCommunityTitle] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  const [communityLogo, setCommunityLogo] = useState(null); // store File
  const [logoPreview, setLogoPreview] = useState(null); // store preview URL

  const handleCommunityNameChange = (e) => {
    setCommunityName(e.target.value);
  };
  const handleCommunityTitleChange = (e) => {
    setCommunityTitle(e.target.value);
  };
  const handleCommunityDescChange = (e) => {
    setCommunityDesc(e.target.value);
  };

  // ✅ Handle image selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommunityLogo(file);
      setLogoPreview(URL.createObjectURL(file)); // create preview
    }
  };

  // ✅ Handle form submission (later, for upload)
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can later upload `communityLogo` to Firebase or your server
    console.log({
      communityName,
      communityTitle,
      communityDesc,
      communityLogo,
    });

    // Simple validation example
    if (!communityName || !communityTitle) {
      toast.error("Please fill required fields");
      return;
    }

    //Send it to server action. if answer is success navigate to that specific community of that person
    const communityId = 2;
    if (communityId) {
      toast.success("Successfully created the community!");
      router.push(`/communities/${communityId}`);
    } else {
      toast.error("Error while creating post.");
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 md:w-[80%] md:mx-auto md:text-2xl"
    >
      {/* Community Logo */}
      <div className="space-y-1">
        <label className="block font-medium">Community Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full border-2 border-gray-300 rounded-xl p-2 cursor-pointer focus:outline-sky-400"
        />
        {logoPreview && (
          <div className="mt-2">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-24 h-24 object-cover rounded-xl border"
            />
          </div>
        )}
      </div>

      {/* Community Name */}
      <div className="space-y-1">
        <label>Community Name:</label>
        <input
          className="px-2 py-1 border-2 rounded-xl w-full focus:outline-sky-400"
          placeholder="Give name of your community"
          onChange={handleCommunityNameChange}
          value={communityName}
        />
      </div>

      {/* Community Title */}
      <div className="space-y-1">
        <label>Community Title:</label>
        <input
          className="px-2 py-1 border-2 rounded-xl w-full focus:outline-sky-400"
          placeholder="Title line of your community"
          onChange={handleCommunityTitleChange}
          value={communityTitle}
        />
      </div>

      {/* Community Description */}
      <div className="space-y-1">
        <label>Community Description:</label>
        <textarea
          className="px-2 py-1 h-48 border-2 rounded-xl w-full focus:outline-sky-400"
          placeholder="Describe your community"
          onChange={handleCommunityDescChange}
          value={communityDesc}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 cursor-pointer"
      >
        Create Community
      </button>
    </form>
  );
}

export default CreateCommunityForm;
