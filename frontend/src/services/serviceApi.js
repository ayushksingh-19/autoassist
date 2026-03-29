import API from "./api";

export const createRequest = (data, token) => {
  return API.post("/services/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyRequests = (token) => {
  return API.get("/services/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};