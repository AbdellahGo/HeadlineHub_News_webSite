import { ID, Query } from "appwrite";
import { INewUser, IStory } from "../../types";
import { account, appwriteConfig, avatars, database } from "./config";

//? create User Account
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if (!newAccount) throw Error
        const avatarUrl = avatars.getInitials(user.name)
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })
        return newUser
    } catch (error) {
        console.log(error);
    }
}

//? sign in account

export async function signInAccount(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        return session
    } catch (error) {
        console.log(error);
    }
}

//? save user to db
export async function saveUserToDB(user: {
    accountId: string,
    name: string,
    email: string,
    username: string,
    imageUrl: URL,
}) {
    try {
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        )
        return newUser
    } catch (error) {
        console.log(error);
    }
}


// ? get Account 

export async function getAccount() {
    try {
        const currentAccount = await account.get()
        return currentAccount
    } catch (error) {
        console.log(error);
    }
}


//? get user

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
        return null
    }
}



//? get Saved Stories

export async function getSavedStories(userId: string) {
    try {
        const savedStories = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.savedStoriesCollectionId,
            [Query.equal("user", userId), Query.orderDesc("$createdAt")]
        )
        if (!savedStories) throw Error;

        return savedStories
    } catch (error) {
        console.log(error);
        return null
    }
}




//? Save Stories
export async function saveStories(storyData: IStory) {
    try {
        const savedStory = database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savedStoriesCollectionId,
            ID.unique(),
            {
                user: storyData.userId,
                uri: storyData.uri,
                category: storyData.category,
                title: storyData.title,
                image: storyData.image,
                description: storyData.description,
                updated: storyData.updated, 
            }
        )
        return savedStory
    } catch (error) {
        console.log(error);
    }
} 

//?  Undo Save Stories
export async function undoSaveStories(storyId: string) {
    if (!storyId) return
    try {
        const statusCode = await database.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savedStoriesCollectionId,
            storyId
        )
        if (!statusCode) return Error
        return {status: 'Ok'}
    } catch(error) {
        console.log(error);
    }
    
}