import {Account, Avatars, Client, Databases} from 'appwrite'



export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    savedStoriesCollectionId: import.meta.env.VITE_APPWRITE_SAVED_STORIES_COLLECTION_ID,
}




export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const database = new Databases(client)
export const avatars = new Avatars(client)