import API from "./api";

const normalizeList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const createRequest = async (data) => {
  const response = await API.post("/services/create", data);
  return response.data?.newRequest || response.data?.data || response.data;
};

export const getMyRequests = async () => {
  const response = await API.get("/services/my");
  return normalizeList(response.data);
};

export const getNearbyRequests = async (lat, lng) => {
  const response = await API.get(`/services/all?lat=${lat}&lng=${lng}`);
  return normalizeList(response.data);
};
