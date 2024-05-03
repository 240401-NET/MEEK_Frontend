import React , {createContext, useState, useContext, useEffect} from 'react'
import { UserSignUp, UserLogin , UserLogout} from '../services/userServices';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null,
  token: string | null,
  loginUser: (username: string, password: string) => void
  register: (email: string, username: string, password: string) => void
  isLoggedIn: () => boolean;
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children : React.ReactNode
}

export const AuthProvider = ( {children} : Props ) => {
    const navigate = useNavigate();
    const [user , setUser] = useState<string | null>(null);
    const [token , setToken] = useState<string | null>(null)
    const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
        if(user && token) {
          setUser(JSON.parse(user));
          setToken(token);
        }
        setIsAuthenticated(true)
    }, [])

    const register = async (email: string, username: string, password: string) => {
      await UserSignUp(email, username, password)
        .then((res) => {
          if (res){
            localStorage.setItem("token", res.url + res.statusText);
            localStorage.setItem("user", username);
            setToken(res.url + res.statusText);
            setUser(username!);
            navigate('/');
          }
        })
        .catch((error) => console.error(error))
    } 

    const loginUser =  async (username: string, password: string ) => {
      await UserLogin(username, password)
        .then((res) => {
          if(res){
            localStorage.setItem("token", res.url + res.statusText)
            localStorage.setItem("user", username);
            setToken(res.url + res.statusText);
            setUser(username!);
            navigate('/');
          }
        })
        .catch((error) => console.error(error))
      }

    const logoutUser = async () => {
      await UserLogout
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken("");
      navigate("/login")
    }

    const isLoggedIn = () => {
      return !!user
    }

      return (

        <AuthContext.Provider value = {{ loginUser, isLoggedIn, user, token, register, logoutUser }} >
            {isAuthenticated ? children : null}
        </AuthContext.Provider>
      )
}

export const useAuth = () => useContext(AuthContext)
