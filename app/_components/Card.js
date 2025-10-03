"use client";

import { createContext, useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CardContext = createContext(null);

function Card({ children, onClose, setting }) {
  const handleClick = () => {
    // openCard(id);
    onClose();
  };
  return (
    <CardContext.Provider value={{ setting: setting, onClose }}>
      {/* Backdrop */}
      {/* // Backdrop (blocks all clicks underneath) */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={handleClick} // close when clicking outside
      >
        {/* Modal Box */}
        <div
          className="relative bg-white p-4 rounded-2xl shadow-xl w-80"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={handleClick}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold mb-2">{setting.title}</h1>
          {setting.popupDescription && <p>{setting.popupDescription}</p>}

          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
}

function CardButton() {
  const { setting, onClose } = useContext(CardContext);
  const { primaryText, secondaryText } = setting;
  return (
    <div className="w-full flex justify-end items-center px-2 py-1 gap-2">
      <button
        className="px-2 py-1 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-300"
        onClick={onClose}
      >
        {secondaryText}
      </button>
      <button className="px-2 py-1 rounded-xl bg-sky-500 cursor-pointer hover:bg-sky-700 text-white">
        {primaryText}
      </button>
    </div>
  );
}

function CardInputField() {
  const [title, setTitle] = useState("");
  const { setting } = useContext(CardContext);
  const { title: placeholderTitle, maxCharLen = "" } = setting;

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          if (!maxCharLen) {
            setTitle(e.target.value);
          }
          if (maxCharLen && e.target.value.length <= maxCharLen) {
            setTitle(e.target.value);
          }
        }}
        className="w-full sm:max-w-[70vw] border-slate-400 border-2 rounded-2xl px-2 py-2 text-xl hover:cursor-pointer hover:bg-slate-200 hover:border-black"
        placeholder={placeholderTitle}
        required
      />
      {/* Character Counter */}
      {maxCharLen && (
        <div
          className={`text-sm mt-1 ${
            title.length >= maxCharLen
              ? "text-red-500 font-bold"
              : "text-gray-600"
          }`}
        >
          {title.length}/{maxCharLen}
        </div>
      )}
    </div>
  );
}

function CardOptionSelector() {
  const { setting } = useContext(CardContext);
  const { optionArr } = setting;
  const [selectedOption, setSelectedOption] = useState("");

  if (!optionArr) return;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Select One Option:</h2>
      <div className="space-y-1">
        {optionArr.map((option, idx) => (
          <label className="block" key={idx}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
}

export { Card, CardButton, CardInputField, CardOptionSelector };
