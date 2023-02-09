const BASE_URL = "http://localhost:3000/api/v1"; //dev

const jwtDefaultConfig = {
  singupEndpoint: `${BASE_URL}/auth/signup`,
  loginEndpoint: `${BASE_URL}/auth/`,

  tokenType: "Bearer",

  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};

export default jwtDefaultConfig;
