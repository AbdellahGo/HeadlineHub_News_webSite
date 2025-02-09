


//* Appwrite mutations

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { INewUser, IStory } from "../../types"
import { createUserAccount, getSavedStories, logOutAccount, saveStories, signInAccount, undoSaveStories } from "../appwrite/api"
import { getArtsNews, getBusinessNews, getHomeNews, getBlogs, getPoliticsNews, getTechnologyNews, getWorldNews, getNewsByCategoryName, getNewsBySearchQuery, getStoryDetailsByUri } from "../NytimesApi/api"
import { QUERY_KEYS } from "./queryKeys"

//? create user Account Mutation
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

//? sign in account Mutation
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}

//? log out account Mutation
export const useLogOutAccount = () => {
    return useMutation({
        mutationFn: logOutAccount,
    });
};



//? Save Stories mutations
export const useSaveStories = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (storyData: IStory) => saveStories(storyData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SAVED_STORIES],
            })
        }
    })
}

//? Undo Save Stories mutations
export const useUndoSaveStories = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (storyId: string) => undoSaveStories(storyId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_SAVED_STORIES],
            })
        }
    })
}

//? get Saved Stories  query
export const useGetSavedStories = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVED_STORIES],
        queryFn: () => getSavedStories(userId),
        enabled: !!userId,
    })
}



//* NYT queries

export const useGetHomeNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TOP_NEWS],
        queryFn: getHomeNews,
    })
}

export const useGetWorldNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_WORLD_NEWS],
        queryFn: getWorldNews,
    })
}

export const useGetBusinessNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BUSINESS_NEWS],
        queryFn: getBusinessNews,
    })
}

export const useGetTechnologyNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TECHNOLOGY_NEWS],
        queryFn: getTechnologyNews,
    })
}


export const useGetArtsNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ARTS_NEWS],
        queryFn: getArtsNews,
    })
}
export const useGetPoliticsNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POLITICS_NEWS],
        queryFn: getPoliticsNews,
    })
}


export const useGetBlogs = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BLOGS],
        queryFn: () => getBlogs(),
    })
}

export const useGetNewsByCategoryName = (categoryName: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_NEWS_BY_CATEGORY_NAME, categoryName],
        queryFn: () => getNewsByCategoryName(categoryName)
    })
}

export const useGetNewsBySearchQuery = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_NEWS_BY_SEARCH_QUERY, query],
        queryFn: () => getNewsBySearchQuery(query)
    })
}

export const useGetStoryDetailsByUri = (uri: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_STORY_DETAILS_BY_URI, uri],
        queryFn: () => getStoryDetailsByUri(uri)
    })
}