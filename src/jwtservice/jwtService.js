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

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 401) {
        if (response && response.status === 401) {
          // ** refreshToken not needed on these urls
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken()
              .then((r) => {
                this.isAlreadyFetchingAccessToken = false;
                this.setToken(r.data.accessToken);
                this.setRefreshToken(r.data.refreshToken);
                this.onAccessTokenFetched(r.data.accessToken);
              })
              .catch((e) => {
                this.isAlreadyFetchingAccessToken = false;
              });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              this.isAlreadyFetchingAccessToken = false;
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
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

  login(args) {
    return axios.post(this.jwtConfig.loginEndpoint, args);
  }

  singup(args) {
    return axios.post(this.jwtConfig.singupEndpoint, args);
  }

  // logout() {
  //   return axios.post(this.jwtConfig.logoutEndpoint, {
  //     refreshToken: this.getRefreshToken(),
  //   });
  // }

  // getAllEvents() {
  //   return axios.get(this.jwtConfig.allEventsEndpoint);
  // }
}

const jwt = new JwtService();
export default jwt;
