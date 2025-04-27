import React, { createContext, useContext, useState, useEffect } from 'react';

const ResetContext = createContext();

export const ResetProvider = ({ children }) => {
  const [resetAllowed, setResetAllowedState] = useState(() => {
    const stored = sessionStorage.getItem("resetAllowed");
    return stored === "true";
  });

  const setResetAllowed = (value) => {
    setResetAllowedState(value);
    sessionStorage.setItem("resetAllowed", value);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("resetAllowed");
    if (stored !== null) {
      setResetAllowedState(stored === "true");
    }
  }, []);

  return (
    <ResetContext.Provider value={{ resetAllowed, setResetAllowed }}>
      {children}
    </ResetContext.Provider>
  );
};

export const useResetContext = () => useContext(ResetContext);
