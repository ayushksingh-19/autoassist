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

export const parseNumericInput = (value) => {
  const match = String(value || "").match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

export const getEvBaseVisitPrice = (vehicleType) => (vehicleType === "Bike" ? 249 : 399);

export const getEvCapacityPrice = (chargerCapacity, vehicleType = "Car") => {
  const kwValue = parseNumericInput(chargerCapacity);

  if (!kwValue) {
    return 0;
  }

  const ratePerKw = vehicleType === "Bike" ? 35 : 45;
  return Math.max(vehicleType === "Bike" ? 99 : 149, Math.round(kwValue * ratePerKw));
};

export const calculateEvChargingTotal = (chargerCapacity, vehicleType = "Car") =>
  getEvBaseVisitPrice(vehicleType) + getEvCapacityPrice(chargerCapacity, vehicleType);

export const getFuelDeliveryFee = (vehicleType) => (vehicleType === "Bike" ? 149 : 199);

export const getFuelRatePerLitre = (fuelType) => {
  const normalizedFuelType = String(fuelType || "").trim().toLowerCase();

  if (normalizedFuelType === "diesel") {
    return 94;
  }

  if (normalizedFuelType === "petrol") {
    return 106;
  }

  return 0;
};

export const calculateFuelDeliveryTotal = (fuelType, fuelQuantity, vehicleType = "Car") => {
  const litres = parseNumericInput(fuelQuantity);
  return getFuelDeliveryFee(vehicleType) + Math.round(getFuelRatePerLitre(fuelType) * litres);
};

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
