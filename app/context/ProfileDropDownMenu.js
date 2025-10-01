"use client";

const { createContext, useCallback, useContext, useState } = require("react");

const ProfileDropDownMenuContext = createContext(null);

export function ProfileDropDownMenu({ children }) {
  const [open, setOpen] = useState(false);

  const openDropDown = useCallback(() => setOpen(true), []);
  const closeDropDown = useCallback(() => setOpen(false), []);
  const toggleDropDown = useCallback(() => setOpen((v) => !v), []);
  return (
    <ProfileDropDownMenuContext.Provider
      value={{ open, openDropDown, closeDropDown, toggleDropDown }}
    >
      {children}
    </ProfileDropDownMenuContext.Provider>
  );
}

export function useProfileDropDown() {
  const ctx = useContext(ProfileDropDownMenuContext);
  if (!ctx)
    throw new Error(
      "UseProfileDropDownContext must be used within <ProfileDropDownMenu>"
    );
  return ctx;
}
