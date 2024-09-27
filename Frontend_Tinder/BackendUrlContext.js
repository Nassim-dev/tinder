import React, { createContext, useContext } from 'react';
import Constants from 'expo-constants';

const BackendUrlContext = createContext();

const getBackendUrl = () => {
  const debuggerHost = Constants.expoConfig.hostUri;
  const ip = debuggerHost.split(':')[0];
  return `http://${ip}:5000`;
};

export const BackendUrlProvider = ({ children }) => {
  // const backendUrl = "http://localhost:5000";
  const backendUrl = getBackendUrl()   
  
  return (
    <BackendUrlContext.Provider value={backendUrl}>
      {children}
    </BackendUrlContext.Provider>
  );
};

export const useBackendUrl = () => {
  return useContext(BackendUrlContext);
};
