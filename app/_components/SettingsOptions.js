"use client";
import { useState } from "react";
import SettingsItem from "./SettingsItem";
import { Card, CardButton, CardInputField, CardOptionSelector } from "./Card";

function SettingsOptions() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
  };
  const generalSettings = [
    {
      id: 1,
      title: "Email Address",
      description: "",
      value: "test@test.com",
      primaryText: "Save",
      secondaryText: "Cancel",
    },
    {
      id: 2,
      title: "Gender",
      description: "",
      value: "Male",
      primaryText: "Save",
      secondaryText: "Cancel",
      optionArr: ["Male", "Female"],
    },
    {
      id: 3,
      title: "Display Name",
      description: "",
      value: "Test",
      primaryText: "Save",
      secondaryText: "Cancel",
      maxCharLen: 30,
    },
    {
      id: 4,
      title: "Avatar",
      description: "Upload an image as an avatar",
      value: "",
      primaryText: "Save",
      secondaryText: "Cancel",
    },
  ];

  const advanceSettings = [
    {
      id: 5,
      value: "",
      description: "",
      title: "Delete Account",
      popupDescription:
        "Are you sure you want to delete your account permanently?",
      primaryText: "Delete Account",
      secondaryText: "Cancel",
    },
  ];

  const selectedSetting =
    generalSettings.find((setting) => setting.id === selectedId) ||
    advanceSettings.find((setting) => setting.id === selectedId);

  const cardTitle = selectedSetting?.title || "Some Title";
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-center">General</h2>
      <div className="p-2 rounded-2xl border-2 md:text-xl">
        {generalSettings.map((setting) => (
          <SettingsItem
            key={setting.id}
            title={setting.title}
            id={setting.id}
            handleClick={handleClick}
            description={setting.description}
            value={setting.value}
          />
        ))}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-center">Advanced</h2>
      <div className="p-2 rounded-2xl border-2 md:text-2xl">
        {advanceSettings.map((setting) => (
          <SettingsItem
            key={setting.id}
            title={setting.title}
            id={setting.id}
            handleClick={handleClick}
            description={setting.description}
            value={setting.value}
          />
        ))}
      </div>
      {selectedId && (
        <Card onClose={() => handleClick(null)} setting={selectedSetting}>
          {selectedId !== 5 && selectedId !== 2 && <CardInputField />}
          <CardOptionSelector />
          <CardButton />
        </Card>
      )}
    </>
  );
}

export default SettingsOptions;
