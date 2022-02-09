export const setToken = (token) => {
  localStorage.setItem("apiTrackerToken", token);
};

export const getToken = () => localStorage.getItem("apiTrackerToken");

export const removeToken = () => localStorage.removeItem("apiTrackerToken");
