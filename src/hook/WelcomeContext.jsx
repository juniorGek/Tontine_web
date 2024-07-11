import React, { createContext, useState, useContext } from 'react';

const WelcomeContext = createContext();

export const useWelcome = () => useContext(WelcomeContext);

export const WelcomeProvider = ({ children }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  return (
    <WelcomeContext.Provider value={{ welcomeMessage, setWelcomeMessage }}>
      {children}
    </WelcomeContext.Provider>
  );
};
