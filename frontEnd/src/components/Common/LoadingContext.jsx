import React, { createContext, useContext, useState } from "react";
import logo from "/logo.png"; 

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); 

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 1,
            transition: "opacity 0.8s ease-in-out",
            zIndex: 9999,
          }}
        >
          <img
            src={logo}
            alt="Loading..."
            style={{ width: "100px", height: "100px", opacity: 0.8 }}
          />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext);
