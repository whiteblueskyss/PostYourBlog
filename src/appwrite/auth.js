import config from "../config/config";
import {client, Account, ID} from 'appwrite';

class Auth {
  client = new client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectId);

    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}) {
      const userAccount = await this.account.create( ID.unique(), email, password, name);
      if(userAccount){
          //call another method. it will directly login the user
          return this.login(email, password);
      }
      else{
          return userAccount;
      }
  }

  async login({email, password}) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
        console.log("Error in login", error);
        return error;

    }
  }

  async getCurrentUser(){
      try{
        return this.account.get();
      }catch (error) {
        console.log("Error in getCurrentUser", error);
      }

      return null;
  }

  async logout(){
      try{
        return this.account.deleteSessions();
      }catch (error) {
        console.log("Error in logout", error);
      }
  }
}


const auth = new Auth();

export default auth;