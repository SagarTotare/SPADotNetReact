import axios from "axios";

const API_URL = "http://localhost:54306/api/";

class ApiService {
  get(url) {
    return axios.get(API_URL + url);
  }

  post(url, postData) {
    return axios.post(API_URL + url, postData);
  }

  put(url, putData) {
    return axios.put(API_URL + url, putData);
  }

  delete(url, deleteData) {
    return axios.delete(API_URL + url, deleteData);
  }
}

export default new ApiService();
