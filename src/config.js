export const config = {
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8081/api/"
      : "https://indigoapitracker.herokuapp.com/api/",
  bseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://indigoreactapitracker.herokuapp.com",
};