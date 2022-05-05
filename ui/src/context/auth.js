import { createContext } from "react";

export const authContext = createContext();

const AuthProvider = ({children}) => {
  return (
    <authContext.Provider>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider;