import { Dispatch, SetStateAction } from "react";

export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
}

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
};

export type IContextType = {
    user: IUser;
    isDarkMode: boolean,
    setIsDarkMode: Dispatch<SetStateAction<boolean>>,
    handleSwitchTheme: () => void
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
    allSavedStoriesUris: string[],
    handleSaveOrUndoSaveStories: (storyData: IStory) => Promise<void>,
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
}

export type ITopNewsType = {
    byline: { original: string }
    abstract: string,
    multimedia: {
        url: string
    }[]
    headline: { main: string }
    pub_date: string
    section_name: string
    uri: string
    web_url?: string
    snippet?: string
    lead_paragraph?: string
}[]


export type INewsType = {
    byline: string
    section: string
    title: string
    abstract: string
    uri: string
    published_date: string
    multimedia: { url: string }[]
    snippet?: string
    leadParagraph?: string
    webUrl?: string
}[]


export type IStory = {
    userId: string
    category: string
    title: string
    description: string
    updated: string
    image: string
    uri: string
}