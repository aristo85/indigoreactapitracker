export const setToken = (data) => {
  const dataStr = JSON.stringify(data);
  localStorage.setItem("apiTrackerToken", dataStr);
};

export const getToken = () => localStorage.getItem("apiTrackerToken");

export const removeToken = () => localStorage.removeItem("apiTrackerToken");
