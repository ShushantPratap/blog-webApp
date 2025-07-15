import Configure from '../configure/Configure';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    Client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.Client
            .setEndpoint(Configure.appwriteUrl)
            .setProject(Configure.appwriteProjectId);
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const documentId = slug + ID.unique();
            return await this.databases.createDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                documentId.length > 36 ? ID.unique() : documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("Appwrite serive :: createPost :: error ", error);     
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Appwrite serive :: updatePost :: error ", error);            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite serive :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite serive :: getPost :: error ", error);     
            return false;
        }
    }

    async getPosts(lastId){
        try {
            const query = lastId ? Query.cursorAfter(lastId) : Query.offset(0);
            return await this.databases.listDocuments(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                [
                    Query.limit(8),
                    query
                ]
            );
        } catch (error) {
            console.error("Appwrite serive :: getPosts :: error ", error);     
            return false;
        }
    }
    // Get user posts
    async getUserPosts(userId){
         try {
            if(userId){
                return await this.databases.listDocuments(
                    Configure.appwriteDatabaseId,
                    Configure.appwriteCollectionId,
                    [Query.equal("userId", [userId])]
                );
            }
        } catch (error) {
            console.error("Appwrite serive :: getUserPosts :: error ", error);     
            return false;
        }
    }
    // Get saved posts
    async getSavedPosts(postId){
         try {
            return await this.databases.listDocuments(
                Configure.appwriteDatabaseId,
                Configure.appwriteCollectionId,
                [Query.equal("$id", postId)]
            );
        } catch (error) {
            console.error("Appwrite serive :: getUserPosts :: error ", error);     
            return false;
        }
    }

    // File upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Configure.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite serive :: uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Configure.appwriteBucketId,
                fileId
            );
            return true;   
        } catch (error) {
            console.error("Appwrite serive :: deleteFile :: error ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            Configure.appwriteBucketId,
            fileId
        );
    }

    // This is own method
    getFileView(fileId){
        return Configure.appwriteUrl
        + "/storage/buckets/"
        + Configure.appwriteBucketId
        + "/files/"
        + fileId
        + "/view?project="
        + Configure.appwriteProjectId
        + "&mode=admin";
    }

}

const service = new Service();
export default service;