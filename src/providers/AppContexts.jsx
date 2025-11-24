"use client";

import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();

const AppContexts = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contextInfo = {
    isOpen,
    setIsOpen,
  };
  return (
    <AppContext.Provider value={contextInfo}>{children}</AppContext.Provider>
  );
};

export default AppContexts;
export const useAppContext = () => {
  return useContext(AppContext);
};
