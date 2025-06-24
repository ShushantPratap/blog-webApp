import Configure from '../configure/Configure';
import { Client, Databases, ID } from 'appwrite';

export class Service{
    Client = new Client();
    databases;
    
    constructor(){
        this.Client
            .setEndpoint(Configure.appwriteUrl)
            .setProject(Configure.appwriteProjectId);
        this.databases = new Databases(this.Client);
    }
    
    async saveUserData(slug, email, userData){
        try {
            const userInfo = JSON.stringify(userData);
            const result = await this.databases.createDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteAccountsCollectionId,
                slug,
                {
                    email,
                    userData: userInfo
                },
            );
            return result;
        } catch (error) {
            console.error("Appwrite serive :: saveUserData :: error ", error);     
        }
    }

    async updateUserData(slug, email, userData){
        try {
            const userInfo = JSON.stringify(userData);
            return await this.databases.updateDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteAccountsCollectionId,
                slug,
                {
                    email,
                    userData: userInfo
                }
            );
        } catch (error) {
            console.error("Appwrite serive :: updateUserData :: error ", error);
            return false;          
        }
    }
  
    async getUser(slug){
        try {
            return await this.databases.getDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteAccountsCollectionId,
                slug
            );
        } catch (error) { 
            console.log(error)   
            return false;
        }
    }

    async getAllUsers(){
        try {
            return await this.databases.listDocuments(
                Configure.appwriteDatabaseId,
                Configure.appwriteAccountsCollectionId,
            );
        } catch (error) {
            console.error("Appwrite serive :: getAllUsers :: error ", error);     
            return false;
        }
    }
}

const service = new Service();
export default service;
