import axios from "axios";

const API_URL = "http://localhost:54306/api/";

class ApiService {
  get(url) {
    this.isUserLoggedIn();
    return axios.get(API_URL + url, { headers: this.authHeader() });
  }

  post(url, postData) {
    return axios.post(API_URL + url, postData, { headers: this.authHeader() });
  }

  put(url, putData) {
    return axios.put(API_URL + url, putData, { headers: this.authHeader() });
  }

  delete(url) {
    return axios.delete(API_URL + url, {
      headers: this.authHeader(),
    });
  }

  authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      return {};
    }
  }

  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    //todo : check with backend
    return user && user.accessToken;
  }

  logOut() {
    //todo : delete from backend
    localStorage.removeItem("user");
  }
}

export default new ApiService();
