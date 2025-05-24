import config from "../config/config";
import { Client, Storage, Query, Databases, ID } from "appwrite";

const databaseId = config.appwriteDatabaseId;
const collectionId = config.appwriteCollectionId;
const bucketId = config.appwriteBucketId;

class StorageService {
  client = new Client();
  bucket;
  database;

  handleError(context, error) {
    console.log(`Appwrite Error :: ${context}: `, error);
    throw error;
  }

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.bucket = new Storage(this.client);
    this.database = new Databases(this.client);
  }

  async createBlog({ title, slug, content, featureImage, status, userId }) {
    try {
      const blog = await this.database.createDocument(
        databaseId,
        collectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
      return blog;
    } catch (error) {
      this.handleError("Create blog", error);
    }
  }

  async updateBlog(slug, { title, content, featureImage, status }) {
    try {
      const res = await this.database.updateDocument(
        databaseId,
        collectionId,
        slug,
        {
          title,
          content,
          status,
          featureImage,
        }
      );
      return res;
    } catch (error) {
      this.handleError("Update blog", error);
    }
  }

  async deleteBlog(slug) {
    try {
      const res = await this.database.deleteDocument(
        databaseId,
        collectionId,
        slug
      );
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.handleError("Delete blog", error);
    }
  }

  async getBlog(slug) {
    try {
      const res = await this.database.getDocument();
      if (res) {
        return res;
      } else {
        return false;
      }
    } catch (error) {
      this.handleError("Get blog", error);
    }
  }

  async listBlogs() {
    try {
      const res = await this.database.listDocuments(databaseId, collectionId, [
        Query.equal("status", "true"),
      ]);
      if (res) {
        return res;
      } else {
        return false;
      }
    } catch (error) {
      this.handleError("List blog", error);
    }
  }

  async uploadImage(fileBlob) {
    try {
      const res = await this.bucket.createFile(bucketId, ID.unique(), fileBlob);
      if (res) {
        return res;
      } else {
        return false;
      }
    } catch (error) {
      this.handleError("Upload iamge", error);
    }
  }

  async deleteImage(fileId) {
    try {
      const res = await this.bucket.deleteFile(bucketId, fileId);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.handleError("Delete image", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(bucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
