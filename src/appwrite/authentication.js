import Configure from "../configure/Configure";
import { Client, Account, Storage } from "appwrite";

export class AuthService {
    Client = new Client();
    bucket;
    account;

    constructor(){
        this.Client
            .setEndpoint(Configure.appwriteUrl)
            .setProject(Configure.appwriteProjectId);
        this.account = new Account(this.Client);
        this.bucket = new Storage(this.Client);
        
    }

    async createAccount({userId, name, email, password}){
        try{
            const userAccount = await this.account.create(userId, email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password});
            }else {
                return userAccount;
            }
        } catch(error){
            // console.log("Appwrite service :: createAccount :: error ", error);
            console.error({error});
            return false;
        }
    }

    // File upload service
    async setProfileImage(imageId, file){
        try {
            return await this.bucket.createFile(
                Configure.appwriteBucketId,
                `profile-image-${imageId}`,
                file
            );
        } catch (error) {
            console.error("Appwrite serive :: uploadFile :: error ", error);
            return false;
        }
    }

    async login({email, password}){
        try {
            return await this.account
                .createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error ", error); 
            return false;       
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);   
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);          
            return false;
        }
    }

    // Update methods
    async updateEmail(email, password){
        try {
            const result = await this.account.updateEmail(
                email, // email
                password // password
            );
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateEmail :: error ", error);
            return false;        
            
        }
    }

    async updateName(name){
        try {
            const result = await this.account.updateName(
                name // name
            );
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateName :: error ", error);
            return false;        
            
        }
    }

    async updatePassword(password, oldPassword){
        try {
            const result = await this.account.updatePassword(
                password, // password
                oldPassword // old password
            );
            return result;
        } catch (error) {
            console.log("Appwrite service :: updatePassword :: error ", error);
            return false;        
            
        }
    }

    async getSessions(){
        try {
            const result = await this.account.listSessions();
            return result;
        } catch (error) {
            console.log("Appwrite service :: getSessions :: error ", error);
            return false;
        }
    }

    async deleteSession(sessionId){
            try {
                const result = await this.account.deleteSession(
                    sessionId // sessionId
                );
                return result;
            } catch (error) {
                console.log("Appwrite service :: deleteSession :: error ", error);
                return false;
            }
        }

        async getLogs(){
            try {
                const result = await this.account.listLogs();
                return result;
            }catch (error) {
                console.log("Appwrite service :: getLogs :: error ", error);
                return false;   
            }
        }
}

const authService = new AuthService();

export default authService;