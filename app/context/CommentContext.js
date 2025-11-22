"use client";

const { createContext, useContext } = require("react");

const CommentContext = createContext(null);

export function CommentContextProvider({ postId, onNewComment, children }) {
  return (
    <CommentContext.Provider value={{ postId, onNewComment }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const ctx = useContext(CommentContext);
  if (!ctx)
    throw new Error("useComment must be used within <CommentContextProvider>");
  return ctx;
}
