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
}



export type ITopNewsType = {
    abstract: string,
    multimedia: {
        url: string
    }[]
    headline: {main : string}
    pub_date: string
    section_name: string
    uri: string
}[]


export type INewsType = {
    byline: string
    section: string
    title: string
    abstract: string
    uri: string
    published_date: string
    multimedia: {url: string}[]
}[]