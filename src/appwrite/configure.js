import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}) {
    try{
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      )
    }catch(e){
      console.error("Appwrite createpost error", e);
    }
  }

  async updatePost(slug, {title, content, featuredImage, status}) {
    try{
      return await this.databases.updateDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    }catch(e){
      console.error("Appwrite updatePost error", e);
    }
  }

  async deletePost(slug){
    try{
      return await this.databases.deleteDocument(
        config.databaseId,
        config.collectionId,
        slug
      )
    }catch(e){
      console.error("Appwrite deletePost error", e);
    }
  }

  async getPost(slug){
    try{
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionId,
        slug
      )
    }catch(e){
      console.error("Appwrite getPost error", e);
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]){
    try{
      return await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        queries
      )
    }catch(e){
      console.error("Appwrite getPosts error", e);
    }
  }

  async uploadFile(file){
    try{
      return await this.bucket.createFile(
        config.bucketId,
        ID.unique(),
        file
      )
    }catch(error){
      console.log("Apwwrite upload file error: ", error);
    }
  }

  async deleteFile(fileId){
    try {
      return await this.deleteFile(config.bucketId, fileId)
    } catch (error) {
      console.log("Error in deleteFile: ", error);      
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(config.bucketId, fileId);
  }

  
  
}

const service = new Service();

export default service;