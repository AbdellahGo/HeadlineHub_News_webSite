import { createContext, useContext, useEffect, useState } from "react"
import { IContextType, IUser } from "../types"
import { getCurrentUser } from "../lib/appwrite/api"



export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isDarkMode: false,
    setIsDarkMode: () => { },
    handleSwitchTheme: () => { },
    isLoading: false,
    setUser: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

const AppContext = createContext<IContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleSwitchTheme = () => {
        setIsDarkMode(prev => !prev)
    }


    const checkAuthUser = async () => {
        setIsLoading(false)
        try {
            const currentAccount = await getCurrentUser()
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl
                })
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error);
            return false
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        checkAuthUser();
    }, [])

    const value = {
        user,
        setUser,
        isDarkMode,
        setIsDarkMode,
        handleSwitchTheme,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export const useAppContext = () => useContext(AppContext)