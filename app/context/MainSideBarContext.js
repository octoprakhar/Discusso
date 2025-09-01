"use client";

const { createContext, useCallback, useContext, useState } = require("react");

const SidebarContext = createContext(null);

export function MainSideBarProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openSiderbar = useCallback(() => setOpen(true), []);
  const closeSiderbar = useCallback(() => setOpen(false), []);
  const toggleSidebar = useCallback(() => setOpen((v) => !v), []);
  return (
    <SidebarContext.Provider
      value={{ open, openSiderbar, closeSiderbar, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("UseSidebar must be used within <SidebarProvider>");
  return ctx;
}
