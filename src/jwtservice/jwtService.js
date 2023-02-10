import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";

class JwtService {
  jwtConfig = { ...jwtDefaultConfig };

  isAlreadyFetchingAccessToken = false;

  subscribers = [];

  constructor() {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();

        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        config.headers["Access-Control-Allow-Origin"] = "*";
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  //signup
  signup(args) {
    return axios.post(this.jwtConfig.singupEndpoint, args);
  }

  //login
  login(args) {
    return axios.post(this.jwtConfig.loginEndpoint, args);
  }

  //add new category
  addNewCategory(arg) {
    return axios.post(this.jwtConfig.categoryEndpoint, arg);
  }

  //get all categories
  getAllCategories() {
    return axios.get(this.jwtConfig.categoryEndpoint);
  }

  //update category
  updateCategory(id, args) {
    return axios.patch(`${this.jwtConfig.categoryEndpoint}/${id}`, args);
  }

  //delete category
  deleteCategory(id) {
    return axios.delete(`${this.jwtConfig.categoryEndpoint}/${id}`);
  }

  //add new car
  addNewCar(arg) {
    return axios.post(this.jwtConfig.carEndpoint, arg);
  }

  //get all cars
  getAllCars() {
    return axios.get(this.jwtConfig.carEndpoint);
  }

  //update car
  updateCar(id, args) {
    return axios.patch(`${this.jwtConfig.carEndpoint}/${id}`, args);
  }

  //delete car
  deleteCar(id) {
    return axios.delete(`${this.jwtConfig.carEndpoint}/${id}`);
  }
}

const jwt = new JwtService();
export default jwt;
