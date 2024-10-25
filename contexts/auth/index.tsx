'use client'
import React from "react";

type AuthContextType = {
  authState: 'email' | 'otp' | 'authenticated';
  setAuthState: React.Dispatch<React.SetStateAction<'email' | 'otp' | 'authenticated'>>;
  temp: { email: string, resendId: string } | null;
  setTemp: React.Dispatch<React.SetStateAction<{ email: string, resendId: string } | null>>
};

// Set initial value as `null` or default values that match the type
const authContext = React.createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = React.useState<'email' | 'otp' | 'authenticated'>('email');
  const [temp, setTemp] = React.useState<{ email: string, resendId: string } | null>(null);
  return (
    <authContext.Provider value={{ authState, setAuthState, temp, setTemp }}>
      {children}
    </authContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}

export { AuthContextProvider, authContext };
