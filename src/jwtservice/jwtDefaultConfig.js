const BASE_URL = "http://localhost:4000/v1"; //dev

const jwtDefaultConfig = {
  tokenType: "Bearer",

  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",

  //auth endpoints
  singupEndpoint: `${BASE_URL}/auth/signup`,
  loginEndpoint: `${BASE_URL}/auth/login`,

  //category endpoints
  categoryEndpoint: `${BASE_URL}/category`,

  //car endpoints
  carEndpoint: `${BASE_URL}/car`,
};

export default jwtDefaultConfig;
