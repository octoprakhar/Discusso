"use client";
import { useState } from "react";
import SettingsItem from "./SettingsItem";
import {
  Card,
  CardAvatarUploader,
  CardButton,
  CardInputField,
  CardOptionSelector,
} from "./Card";

function SettingsOptions({ user }) {
  const [selectedId, setSelectedId] = useState(null);
  const [userData, setUserData] = useState(user);

  //I will call it in card when a setting is updated
  const handleUpdateSetting = (col, newValue) => {
    setUserData((prev) => ({
      ...prev,
      [col]: newValue,
    }));
  };

  const handleClick = (id) => {
    setSelectedId(id);
  };
  const generalSettings = [
    {
      id: 1,
      col: "email",
      title: "Email Address",
      description: "",
      value: userData.email || "test@test.com",
      primaryText: "Save",
      secondaryText: "Cancel",
    },
    {
      id: 2,
      col: "gender",
      title: "Gender",
      description: "",
      value: userData.gender || "Select",
      primaryText: "Save",
      secondaryText: "Cancel",
      optionArr: ["Male", "Female"],
    },
    {
      id: 3,
      col: "displayName",
      title: "Display Name",
      description: "",
      value: userData.displayName || "Test",
      primaryText: "Save",
      secondaryText: "Cancel",
      maxCharLen: 30,
    },
    {
      id: 4,
      col: "userIcon",
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
        <Card
          onClose={() => handleClick(null)}
          setting={selectedSetting}
          onUpdateSettings={handleUpdateSetting}
        >
          <>
            {/* Avatar uploader */}
            {selectedId === 4 && <CardAvatarUploader />}

            {/* Input field (only for settings that use text input) */}
            {selectedId !== 4 && selectedId !== 5 && selectedId !== 2 && (
              <CardInputField />
            )}

            {/* Radio option selector */}
            {selectedId === 2 && <CardOptionSelector />}

            {/* Action buttons */}
            <CardButton />
          </>
        </Card>
      )}
    </>
  );
}

export default SettingsOptions;
