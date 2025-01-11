import { createContext, useContext, useEffect, useState } from "react"
import { IContextType, IStory, IUser } from "../types"
import { getCurrentUser } from "../lib/appwrite/api"
import { useGetSavedStories, useSaveStories, useUndoSaveStories } from "../lib/react-query/queries"
import { toast } from "react-toastify"



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
    allSavedStoriesUris: [],
    handleSaveOrUndoSaveStories: async () => { },
}

const AppContext = createContext<IContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [allSavedStoriesUris, setAllSavedStoriesUris] = useState<string[]>([])
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //? saved stories
    const { data: allSavedStories } = useGetSavedStories(user.id)
    const { mutateAsync: saveStories } = useSaveStories()
    const { mutateAsync: undoSaveStories } = useUndoSaveStories()


    const handleSaveOrUndoSaveStories = async (storyData: IStory) => {

        if ((allSavedStories?.documents.length ?? 0) > 0) {
            const storyIsSave = allSavedStories?.documents.find((item) => item?.uri === storyData.uri)
            if (storyIsSave) {
                const undoSave = await undoSaveStories(String(storyIsSave.$id))
                if (undoSave) {
                    toast.success(`${storyData.title} has been removed from your saved news.`);
                } else {
                    toast.error(`Sorry, A Problem Occurred. Try Again Later.`);
                }
                return
            }
        }
        const saveStory = await saveStories(storyData)
        if (saveStory) {
            toast.success(`'${storyData.title}' has been saved to your saved news.`);
        } else {
            toast.error(`Sorry, A Problem Occurred. Try Again Later.`);
        }

    }

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
        const savedStorie = allSavedStories?.documents?.map(({ uri }) => uri) || [];
        setAllSavedStoriesUris(savedStorie);
    }, [allSavedStories])


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
        allSavedStoriesUris,
        handleSaveOrUndoSaveStories,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export const useAppContext = () => useContext(AppContext)