import React, { createContext, useContext, useState } from "react";

type TAppContext = {
  data: { id: string };
  setData: React.Dispatch<any>;
};

const AppContext = createContext<TAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<any>([]);
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
