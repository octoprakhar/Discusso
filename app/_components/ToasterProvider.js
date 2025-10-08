"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
        success: {
          style: { background: "#16a34a" }, // green for success
        },
        error: {
          style: { background: "#dc2626" }, // red for error
        },
      }}
    />
  );
}
