import { User } from "../types/UserType";
import ApiUtils from "../utils/ApiUtils";

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await ApiUtils.getApiInstanceJson().get("/user");
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des posts");
    }
  }

  async getOneUser(username: string): Promise<User> {
    try {
      const response = await ApiUtils.getApiInstanceJson().get(
        `/user/${username}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la récupération du post");
    }
  }

  async followUser(username1 : string, username2: string): Promise<User> {
    try {
      const response = await ApiUtils.getApiInstanceJson().patch(`/user/${username1}/follow/${username2}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du follow');
    }
  }

  async unfollowUser(username1 : string, username2: string): Promise<User> {
    try {
      const response = await ApiUtils.getApiInstanceJson().patch(`/user/${username1}/unfollow/${username2}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du follow');
    }
  }
}

const userService = new UserService();
export default userService;