export const getStatusClass = (status) => {
  if (status === "accepted" || status === "assigned") {
    return "accepted";
  }

  if (status === "completed") {
    return "completed";
  }

  if (status === "cancelled") {
    return "cancelled";
  }

  return "pending";
};

export const formatCurrency = (amount) => `Rs ${Number(amount || 0).toLocaleString("en-IN")}`;

export const formatRequestTitle = (request) =>
  request?.serviceType || request?.detailingService || "Service Request";

export const formatRequestSubtitle = (request) =>
  [request?.vehicleType, request?.fuelType].filter(Boolean).join(" - ") || "Roadside support";

export const getRequestStats = (requests) => {
  const total = requests.length;
  const active = requests.filter(
    (request) =>
      request.status === "pending" || request.status === "assigned" || request.status === "accepted"
  ).length;
  const completed = requests.filter((request) => request.status === "completed").length;

  return { total, active, completed };
};
