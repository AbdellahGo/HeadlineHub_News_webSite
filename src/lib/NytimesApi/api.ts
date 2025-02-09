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

//? Functions that fetch news by section 
export async function getHomeNews(): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/home.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
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

export async function getBlogs(): Promise<INewsType | undefined> {
    let result: ITopNewsType = []
    let index = 0
    try {
        while (true) {
            const response = await axiosInstance.get(`/search/v2/articlesearch.json`, {
                params: {
                    'api-key': API_KEY,
                    fq: 'news_desk:(Blogs)',
                    sort: 'newest',
                    page: index
                },
            });
            if (!response.data?.response?.docs || response.data.response.docs.length === 0) {
                break;
            }

            result = [...result, ...response.data?.response?.docs]

            index++
        }
    } catch (error) {
        console.error(error);
    }
    return (result as ITopNewsType).map(({ byline: { original }, headline: { main }, uri, pub_date, abstract, section_name, multimedia }) => ({
        byline: original,
        title: main,
        uri,
        published_date: pub_date,
        abstract,
        section: section_name,
        multimedia
    })) || []
}


//? Function that fetch news by name
export async function getNewsByCategoryName(categoryName: string): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/topstories/v2/${categoryName}.json`, {
            params: {
                'api-key': API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}


//? Function that fetch news by search query
export async function getNewsBySearchQuery(query: string): Promise<INewsType | undefined> {
    let result: ITopNewsType = []
    let index = 0
    try {
        while (true) {
            const response = await axiosInstance.get(`/search/v2/articlesearch.json?q=${query}`, {
                params: {
                    'api-key': API_KEY,
                    sort: 'newest',
                    page: index
                }
            })

            if (!response.data?.response?.docs || response.data.response.docs.length === 0) {
                break;
            }
            result = [...result, ...response.data?.response?.docs]
            index++
        }
    } catch (error) {
        console.log(error);
    }
    return (result as ITopNewsType).map(({ byline: { original }, headline: { main }, uri, pub_date, abstract, section_name, multimedia }) => ({
        byline: original,
        title: main,
        uri,
        published_date: pub_date,
        abstract,
        section: section_name,
        multimedia: multimedia
    })
    ) || [];
}


export async function getStoryDetailsByUri(uri: string): Promise<INewsType | undefined> {
    try {
        const response = await axiosInstance.get(`/search/v2/articlesearch.json?fq=uri:"${uri}"`, {
            params: {
                'api-key': API_KEY,
                sort: 'newest',
            }
        })
        return (response.data?.response?.docs as ITopNewsType).map(({ byline: { original }, headline: { main }, uri, pub_date, abstract, section_name, multimedia, web_url, snippet, lead_paragraph }) => ({
            webUrl: web_url,
            snippet,
            leadParagraph: lead_paragraph,
            byline: original,
            title: main,
            uri,
            published_date: pub_date,
            abstract,
            section: section_name,
            multimedia
        })) || [];
    } catch (error) {
        console.log(error);
    }
}