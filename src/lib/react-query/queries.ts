


//* Appwrite mutations

import { useMutation, useQuery } from "@tanstack/react-query"
import { INewUser } from "../../types"
import { createUserAccount, signInAccount } from "../appwrite/api"
import { getArtsNews, getBusinessNews, getMoreNews, getPoliticsNews, getTechnologyNews, getTopNews, getWorldNews } from "../NytimesApi/api"
import { QUERY_KEYS } from "./queryKeys"

//? create user Account query
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

//? sign in account query
export const useSignInAccount = () => {
    return useMutation(({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    }))
}





//* NYT queries

export const useGetTopNews = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TOP_NEWS],
        queryFn: getTopNews,
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


export const useGetMoreNews = (page: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_MORE_NEWS, page],
        queryFn: () => getMoreNews(page),
    })
}