"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function TitleAndDescFields({ draftTitle = "", draftBody = "" }) {
  const router = useRouter();
  const [title, setTitle] = useState(draftTitle);
  const [body, setBody] = useState(draftBody);
  const [links, setLinks] = useState([]);
  const [keyLink, setKeyLink] = useState("");
  const [valueLink, setValueLink] = useState("");
  const searchParams = useSearchParams();
  const postType = searchParams.get("postType");

  const [mediaFiles, setMediaFiles] = useState([]);

  // Select files
  const handleSelectMedia = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]); // append new files
  };

  // Remove single file
  const handleRemoveMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Remove all files
  const handleRemoveAllMedia = () => {
    setMediaFiles([]);
  };

  const handleCancelLink = () => {
    setKeyLink("");
    setValueLink("");
  };

  const handleSaveLink = () => {
    if (!keyLink || !valueLink) return;

    const newLink = { key: keyLink, value: valueLink };

    setLinks((prevLinks) => [...prevLinks, newLink]);

    setKeyLink("");
    setValueLink("");
  };

  const handleCreatePost = () => {
    //Send server action and get the result as success or failure. If success move to then home page
    const success = true;
    if (success) {
      toast.success("Successfully created post!");
      router.push("/");
    } else {
      toast.error("Error while creating the post.");
    }
  };

  const handleCancelCreatePost = () => {
    //If it is draft edit , then go back to draft page, or go back to home page
    if (draftTitle) {
      router.push("/user/drafts");
    } else {
      router.push("/");
    }
  };

  const handleRemoveAllLinks = () => {
    setLinks([]);
  };

  return (
    <div className="space-y-5">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 300) {
              setTitle(e.target.value);
            }
          }}
          className="w-full sm:max-w-[70vw] border-slate-400 border-2 rounded-2xl px-2 py-2 text-xl hover:cursor-pointer hover:bg-slate-200 hover:border-black"
          placeholder="Title"
          required
        />
        {/* Character Counter */}
        <div
          className={`text-sm mt-1 ${
            title.length >= 300 ? "text-red-500 font-bold" : "text-gray-600"
          }`}
        >
          {title.length}/300
        </div>
      </div>
      <textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        className="w-full sm:max-w-[70vw] min-h-52 border-slate-400 border-2 rounded-2xl px-2 py-2 text-xl hover:cursor-pointer hover:bg-slate-200 hover:border-black"
        placeholder="Body"
        required
      />
      {/* Link */}
      {postType === "link" && (
        <div className="space-y-2 w-full sm:max-w-[70vw] border-2 border-slate-400 rounded-2xl px-3 py-2">
          {links &&
            links.map((link, idx) => (
              <p key={idx} className="underline px-4 py-2 text-sky-700">
                {link.key}
              </p>
            ))}

          <div className="space-y-1 sm:space-y-0 sm:flex gap-6">
            <input
              placeholder="Key"
              value={keyLink}
              onChange={(e) => setKeyLink(e.target.value)}
              className="px-2 py-1 border-2 border-slate-400 text-lg rounded-2xl"
            />
            <input
              placeholder="Link"
              value={valueLink}
              onChange={(e) => setValueLink(e.target.value)}
              className="px-2 py-1 border-2 border-slate-400 text-lg rounded-2xl"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="text-xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
              onClick={handleSaveLink}
            >
              Save Link
            </button>
            <button
              className="text-xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
              onClick={handleCancelLink}
            >
              Cancel
            </button>
            <button
              className="text-xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
              onClick={handleRemoveAllLinks}
            >
              Remove All
            </button>
          </div>
        </div>
      )}

      {/* Image/video */}
      {postType === "media" && (
        <div className="space-y-2 sm:max-w-[70vw] border-2 border-slate-400 rounded-2xl px-3 py-2">
          {mediaFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded-md border"
                />
              )}
              <span>{file.name}</span>
              <button
                type="button"
                className="text-red-500 text-sm ml-2"
                onClick={() => handleRemoveMedia(idx)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* File input */}
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="px-2 py-1 border-2 border-slate-400 text-lg rounded-2xl cursor-pointer"
            onChange={handleSelectMedia}
          />

          {/* Buttons */}
          {mediaFiles.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                className="text-xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
                onClick={handleRemoveAllMedia}
              >
                Remove All
              </button>
            </div>
          )}
        </div>
      )}

      <div className="sm:max-w-[70vw] flex justify-end gap-2">
        <button
          className="text-2xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
          onClick={handleCreatePost}
        >
          Post
        </button>
        <button
          className="text-2xl px-2 py-1 rounded-xl border-2 border-slate-500 cursor-pointer hover:bg-slate-200"
          onClick={handleCancelCreatePost}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TitleAndDescFields;
