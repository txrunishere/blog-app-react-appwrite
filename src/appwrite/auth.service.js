import config from "../config/config";
import { Client, ID, Account } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, name, password }) {
    try {
      const res = await this.account.create(ID.unique(), email, password, name);
      if (res) {
        // call login method directly login user after register
        return this.loginUser({ email, password });
      } else {
        return res;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
