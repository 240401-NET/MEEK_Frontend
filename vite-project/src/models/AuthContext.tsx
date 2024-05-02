import React , {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated : boolean;
    setIsAuthenticated : (value: boolean) => void;
    checkAuthentication : () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    checkAuthentication: async () => false
});

interface Props {
    children : React.ReactNode
}

const AuthProvider : React.FC<Props> = ( {children} ) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const checkAuthentication = async () => {
        try {
            const checkAuthCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('yourAuthCookieName='));
        
            if (checkAuthCookie) {
              setIsAuthenticated(true);
              return true;
            } else {
              setIsAuthenticated(false);
              return false;
            }
          } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
          }
      }

      return (
        <AuthContext.Provider value = {{ isAuthenticated, setIsAuthenticated, checkAuthentication}} >
            {children}
        </AuthContext.Provider>
      )
}

export {AuthContext, AuthProvider}