export const ENV = {
  API_URL: import.meta.env.PUBLIC_API_URL,
  BASE_PATH: import.meta.env.PUBLIC_BASE_PATH,
  IS_PROD: import.meta.env.MODE === "production",
};
