import axios from 'axios';
import { INewsType, ITopNewsType } from '../../types';


const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//? Function to fetch top news
export async function getTopNews(): Promise<ITopNewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/search/v2/articlesearch.json`, {
            params: {
                'api-key': API_KEY,
                fq: 'section_name.contains:(business politics health science sports technology world)',
                sort: 'relevance',
            },
        });
        return response.data?.response?.docs;
    } catch (error) {
        console.error(error);
    }
}


export async function getWorldNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/world.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function getBusinessNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/business.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function getTechnologyNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/technology.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}


export async function getArtsNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/arts.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}
export async function getPoliticsNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/politics.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}



export async function getMoreNews(page: number): Promise<ITopNewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/search/v2/articlesearch.json`, {
            params: {
                'api-key': API_KEY,
                fq: 'section_name.contains:(world business politics technology arts opinion education health realestate science sports travel africa asia europe)',
                sort: 'newest',
                page,
            },
        });
        return response.data?.response?.docs;
    } catch (error) {
        console.error(error);
    }
}
