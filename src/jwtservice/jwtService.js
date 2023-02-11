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

  //setting token in local storage
  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  //getting token from local storage
  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  //setting login state
  setLogin(){
    localStorage.setItem("isLogin", true)
  }

  //checking if login
  isLogin() {
    const token = localStorage.getItem("isLogin")
    if (token && (token === true || token === "true"))
      return true;
    else return false;
  }

  //setting user to local storage
  setUser(user){
    localStorage.setItem("user", JSON.stringify(user))
  }

  //getting user from local storage
  getUser(){
    return JSON.parse(localStorage.getItem("user"))
  }

  //signup
  signup(args) {
    return axios.post(this.jwtConfig.singupEndpoint, args);
  }

  //login
  login(args) {
    return axios.post(this.jwtConfig.loginEndpoint, args);
  }

  //logout function
  logout (){
    localStorage.setItem("isLogin", false);
    this.setToken(null)
    this.setUser(null)
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
