import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';

class APIService {
  get = (url: any, data: any) => axiosInstance.get(url, { params: data });
  post = (url: any, data: any) => axiosInstance.post(url, data);
  put = (url: any, data: any) => axiosInstance.put(url, data);
  delete = (url: any) => axiosInstance.delete(url);

  // Check User Log or not
  isLoggedIn = () => {
    return localStorage.getItem('jwt_access_token') ? true : false;
  };

  //Get Logged In user
  getLoggedInUser = (jwt: any) => {
    try {
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}

let apiService = new APIService();
export default apiService;
