import { createContext, useState, useContext, useEffect } from 'react';

export const StoreContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState({});

  return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>;
};

export const useNanaimoContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useNanaimoContext must be used within a NanaimoStore');
  }
  return context;
};

export default ContextProvider;
