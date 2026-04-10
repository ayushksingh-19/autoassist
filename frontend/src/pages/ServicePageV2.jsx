import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEvBaseVisitPrice,
  getEvCapacityPrice,
  getFuelDeliveryFee,
  getFuelRatePerLitre,
  parseNumericInput,
} from "../utils/requestUtils";

const extras = [
  { name: "Brake adjustment", price: 200 },
  { name: "Battery check", price: 250 },
  { name: "Electrical check", price: 300 },
  { name: "Fuel system check", price: 300 },
  { name: "Air filter check", price: 180 },
  { name: "Washing", price: 200 },
];

const nearbyServiceMap = {
  "Fuel Delivery": {
    buttonLabel: "Fuel Pump Near Me",
    query: "fuel pump near me",
    helper: "Find nearby fuel stations in Google Maps before you place the request.",
  },
  "EV Charging": {
    buttonLabel: "EV Chargers Near Me",
    query: "ev charging station near me",
    helper: "Open nearby EV charging stations in Google Maps.",
  },
  "Tyre Services": {
    buttonLabel: "Tyre Shop Near Me",
    query: "tyre repair near me",
    helper: "Check nearby tyre repair and replacement shops.",
  },
  "Mechanic": {
    buttonLabel: "Mechanic Near Me",
    query: "car mechanic near me",
    helper: "See nearby mechanics and garages in Google Maps.",
  },
  "Roadside Repair": {
    buttonLabel: "Roadside Help Near Me",
    query: "roadside assistance near me",
    helper: "Open nearby roadside support options in Google Maps.",
  },
  "Washing & Cleaning": {
    buttonLabel: "Car Wash Near Me",
    query: "car wash near me",
    helper: "Find nearby car wash and detailing centers.",
  },
  Detailing: {
    buttonLabel: "Detailing Near Me",
    query: "car detailing near me",
    helper: "Check nearby detailing and polishing centers.",
  },
  "SOS Emergency": {
    buttonLabel: "Emergency Help Near Me",
    query: "towing service near me",
    helper: "Open nearby towing and emergency support providers.",
  },
};

const roadsideAssistanceOptions = [
  { value: "none", label: "No assistance add-on", price: 0 },
  { value: "basic", label: "Basic roadside assistance", price: 499 },
  { value: "battery-jumpstart", label: "Battery jump-start support", price: 399 },
  { value: "flat-tyre-help", label: "Flat tyre help", price: 449 },
  { value: "spare-wheel-fitment", label: "Spare wheel fitment", price: 349 },
  { value: "puncture-support", label: "Puncture support", price: 399 },
  { value: "minor-electrical", label: "Minor electrical support", price: 599 },
  { value: "engine-overheat", label: "Engine overheating support", price: 699 },
  { value: "brake-issue", label: "Brake issue inspection", price: 649 },
  { value: "clutch-gear", label: "Clutch or gear issue support", price: 699 },
  { value: "fuel-line-check", label: "Fuel line check", price: 549 },
  { value: "lockout-help", label: "Lockout or key access help", price: 499 },
  { value: "breakdown-diagnosis", label: "On-road breakdown diagnosis", price: 799 },
  { value: "tow-coordination", label: "Tow coordination support", price: 899 },
  { value: "accident-support", label: "Accident support coordination", price: 999 },
];

const bikeRoadsideAssistanceOptions = [
  { value: "none", label: "No assistance add-on", price: 0 },
  { value: "basic", label: "Basic bike roadside assistance", price: 299 },
  { value: "puncture-support", label: "Puncture or tube support", price: 249 },
  { value: "chain-support", label: "Chain issue support", price: 299 },
  { value: "brake-support", label: "Brake adjustment support", price: 349 },
  { value: "battery-jumpstart", label: "Bike battery jump-start", price: 249 },
  { value: "clutch-cable", label: "Clutch or cable support", price: 349 },
  { value: "gear-shift", label: "Gear shifting support", price: 399 },
  { value: "engine-stall", label: "Engine stall diagnosis", price: 449 },
  { value: "fuel-line-check", label: "Fuel line or carburetor check", price: 399 },
  { value: "spark-plug", label: "Spark plug check", price: 249 },
  { value: "suspension-check", label: "Front fork or suspension check", price: 449 },
  { value: "lock-set", label: "Handle lock or key issue support", price: 349 },
  { value: "pickup-support", label: "Bike pickup coordination", price: 599 },
  { value: "accident-support", label: "Bike accident support coordination", price: 699 },
];

const carWashOptions = [
  { value: "none", label: "No cleaning option selected", price: 0 },
  { value: "basic-exterior", label: "Basic exterior wash", price: 299 },
  { value: "foam-wash", label: "Foam wash", price: 399 },
  { value: "interior-vacuum", label: "Interior vacuum cleaning", price: 449 },
  { value: "interior-detail", label: "Interior deep cleaning", price: 799 },
  { value: "seat-cleaning", label: "Seat and fabric cleaning", price: 699 },
  { value: "dashboard-polish", label: "Dashboard and trim polish", price: 499 },
  { value: "glass-cleaning", label: "Glass and mirror cleaning", price: 249 },
  { value: "engine-bay", label: "Engine bay cleaning", price: 899 },
  { value: "alloy-cleaning", label: "Alloy and tyre cleaning", price: 349 },
  { value: "underbody-wash", label: "Underbody wash", price: 649 },
  { value: "full-car-spa", label: "Full car spa", price: 1499 },
  { value: "ceramic-topup", label: "Ceramic top-up wash", price: 1299 },
  { value: "waterless-wash", label: "Waterless doorstep wash", price: 549 },
];

const bikeWashOptions = [
  { value: "none", label: "No cleaning option selected", price: 0 },
  { value: "basic-bike-wash", label: "Basic bike wash", price: 149 },
  { value: "foam-bike-wash", label: "Foam bike wash", price: 219 },
  { value: "chain-cleaning", label: "Chain cleaning", price: 179 },
  { value: "chain-lube-cleaning", label: "Chain clean and lube", price: 249 },
  { value: "seat-cleaning", label: "Seat and body cleaning", price: 199 },
  { value: "alloy-cleaning", label: "Wheel and alloy cleaning", price: 179 },
  { value: "engine-detail", label: "Engine area detailing", price: 349 },
  { value: "premium-bike-spa", label: "Premium bike spa", price: 599 },
  { value: "polish-finish", label: "Polish and shine finish", price: 299 },
];

const carTyreOptions = [
  { value: "none", label: "No tyre option selected", price: 0 },
  { value: "puncture-repair", label: "Puncture repair", price: 349 },
  { value: "tyre-inflation", label: "Tyre inflation support", price: 149 },
  { value: "spare-wheel-fitment", label: "Spare wheel fitment", price: 299 },
  { value: "wheel-balancing", label: "Wheel balancing", price: 599 },
  { value: "alignment-check", label: "Wheel alignment check", price: 699 },
  { value: "valve-check", label: "Valve and air leak check", price: 249 },
  { value: "sidewall-inspection", label: "Sidewall damage inspection", price: 399 },
  { value: "single-tyre-replacement", label: "Single tyre replacement support", price: 899 },
  { value: "alloy-rim-check", label: "Alloy rim inspection", price: 449 },
];

const bikeTyreOptions = [
  { value: "none", label: "No tyre option selected", price: 0 },
  { value: "tube-puncture", label: "Tube puncture repair", price: 149 },
  { value: "tubeless-puncture", label: "Tubeless puncture repair", price: 199 },
  { value: "air-fill", label: "Air fill support", price: 99 },
  { value: "valve-check", label: "Valve leak check", price: 149 },
  { value: "tube-change", label: "Tube change support", price: 249 },
  { value: "rear-wheel-removal", label: "Rear wheel removal support", price: 299 },
  { value: "tyre-replacement", label: "Bike tyre replacement support", price: 449 },
  { value: "rim-check", label: "Rim and spoke check", price: 249 },
  { value: "dual-tyre-inspection", label: "Front and rear tyre inspection", price: 199 },
];

const acServiceOptions = [
  { value: "none", label: "No AC option selected", price: 0 },
  { value: "cooling-check", label: "Cooling performance check", price: 399 },
  { value: "gas-topup", label: "AC gas top-up inspection", price: 799 },
  { value: "compressor-check", label: "Compressor check", price: 699 },
  { value: "blower-check", label: "Blower inspection", price: 449 },
  { value: "condenser-check", label: "Condenser and cooling line check", price: 599 },
  { value: "ac-filter-clean", label: "Cabin AC filter cleaning", price: 349 },
  { value: "vent-cleaning", label: "AC vent cleaning", price: 299 },
  { value: "leak-diagnosis", label: "AC leak diagnosis", price: 649 },
  { value: "full-ac-diagnosis", label: "Full AC diagnosis", price: 999 },
];

const lockoutOptions = [
  { value: "none", label: "No lockout option selected", price: 0 },
  { value: "door-unlock", label: "Door unlock support", price: 349 },
  { value: "key-inside", label: "Key locked inside vehicle", price: 399 },
  { value: "smart-key-help", label: "Smart key access support", price: 499 },
  { value: "trunk-open", label: "Trunk or boot unlock", price: 349 },
  { value: "jammed-lock", label: "Jammed lock inspection", price: 449 },
  { value: "key-battery", label: "Key fob battery support", price: 249 },
  { value: "emergency-access", label: "Emergency entry support", price: 599 },
];

const towingOptions = [
  { value: "none", label: "No towing option selected", price: 0 },
  { value: "short-distance", label: "Short-distance towing", price: 1499 },
  { value: "city-towing", label: "City towing support", price: 1999 },
  { value: "flatbed", label: "Flatbed towing", price: 2499 },
  { value: "accident-recovery", label: "Accident recovery towing", price: 2999 },
  { value: "breakdown-lift", label: "Breakdown lift and tow", price: 1899 },
  { value: "basement-pullout", label: "Basement or tight-space pullout", price: 2199 },
  { value: "workshop-drop", label: "Workshop drop support", price: 1699 },
  { value: "highway-support", label: "Highway towing support", price: 3499 },
];

const carDetailingOptions = [
  { value: "none", label: "No detailing option selected", price: 0 },
  { value: "exterior-detail", label: "Exterior detailing", price: 1499 },
  { value: "interior-detail", label: "Interior detailing", price: 1799 },
  { value: "full-detail", label: "Full car detailing", price: 2999 },
  { value: "paint-decontamination", label: "Paint decontamination", price: 1899 },
  { value: "machine-polish", label: "Machine polish", price: 2499 },
  { value: "scratch-swirl-treatment", label: "Scratch and swirl treatment", price: 2799 },
  { value: "paint-correction-stage-1", label: "Paint correction stage 1", price: 3499 },
  { value: "paint-correction-stage-2", label: "Paint correction stage 2", price: 5499 },
  { value: "ceramic-coating", label: "Ceramic coating application", price: 6999 },
  { value: "graphene-coating", label: "Graphene coating application", price: 8999 },
  { value: "ppf-partial", label: "PPF partial protection", price: 12999 },
  { value: "ppf-front", label: "PPF front package", price: 24999 },
  { value: "ppf-full-body", label: "PPF full body package", price: 69999 },
  { value: "headlight-restoration", label: "Headlight restoration", price: 999 },
  { value: "engine-detailing", label: "Engine bay detailing", price: 1499 },
  { value: "seat-shampoo", label: "Seat shampoo and stain removal", price: 1299 },
  { value: "leather-conditioning", label: "Leather cleaning and conditioning", price: 1599 },
  { value: "odor-treatment", label: "Cabin odor and bacteria treatment", price: 1199 },
  { value: "glass-coating", label: "Glass polish and hydrophobic coating", price: 1399 },
  { value: "alloy-protection", label: "Alloy deep clean and protection", price: 1099 },
  { value: "trim-restoration", label: "Plastic trim restoration", price: 1199 },
  { value: "underbody-protection", label: "Underbody anti-rust protection", price: 3499 },
  { value: "windshield-treatment", label: "Windshield clarity treatment", price: 999 },
  { value: "fabric-guard", label: "Fabric guard coating", price: 1499 },
];

const bikeDetailingOptions = [
  { value: "none", label: "No detailing option selected", price: 0 },
  { value: "basic-detail", label: "Basic bike detailing", price: 599 },
  { value: "full-bike-detail", label: "Full bike detailing", price: 1199 },
  { value: "tank-polish", label: "Tank polish and shine", price: 399 },
  { value: "chrome-polish", label: "Chrome polish", price: 499 },
  { value: "engine-degrease", label: "Engine degreasing and detailing", price: 699 },
  { value: "chain-deep-clean", label: "Chain deep clean and lube", price: 349 },
  { value: "alloy-detail", label: "Wheel and alloy detailing", price: 399 },
  { value: "seat-care", label: "Seat care and conditioning", price: 249 },
  { value: "ceramic-bike", label: "Bike ceramic protection", price: 2499 },
  { value: "paint-correction", label: "Minor paint correction", price: 1499 },
  { value: "matte-finish-care", label: "Matte finish care", price: 899 },
];

const carHealthCheckOptions = [
  { value: "none", label: "No health check option selected", price: 0 },
  { value: "basic-inspection", label: "Basic health inspection", price: 599 },
  { value: "computer-diagnostics", label: "Computer diagnostics", price: 1299 },
  { value: "battery-health", label: "Battery and charging system check", price: 499 },
  { value: "engine-scan", label: "Engine scan", price: 899 },
  { value: "brake-check", label: "Brake system check", price: 649 },
  { value: "suspension-check", label: "Suspension and steering check", price: 749 },
  { value: "ac-check", label: "AC performance check", price: 499 },
  { value: "fluid-check", label: "Fluid and leak check", price: 449 },
  { value: "tyre-health", label: "Tyre and wheel health check", price: 399 },
  { value: "pre-trip", label: "Pre-trip inspection", price: 999 },
  { value: "full-health-scan", label: "Full vehicle health scan", price: 1799 },
];

const bikeHealthCheckOptions = [
  { value: "none", label: "No health check option selected", price: 0 },
  { value: "basic-inspection", label: "Basic bike inspection", price: 299 },
  { value: "engine-check", label: "Engine health check", price: 499 },
  { value: "battery-check", label: "Battery and wiring check", price: 249 },
  { value: "brake-check", label: "Brake and clutch check", price: 299 },
  { value: "chain-check", label: "Chain and sprocket check", price: 249 },
  { value: "suspension-check", label: "Suspension check", price: 349 },
  { value: "tyre-check", label: "Tyre and wheel check", price: 199 },
  { value: "full-bike-scan", label: "Full bike health check", price: 799 },
];

const engineDiagnosticOptions = [
  { value: "none", label: "No engine diagnostic option selected", price: 0 },
  { value: "obd-scan", label: "OBD computer scan", price: 899 },
  { value: "check-engine-light", label: "Check engine light diagnosis", price: 999 },
  { value: "misfire-diagnosis", label: "Misfire diagnosis", price: 1199 },
  { value: "starting-issue", label: "Starting issue diagnosis", price: 899 },
  { value: "fuel-system-diagnosis", label: "Fuel system diagnosis", price: 1299 },
  { value: "ignition-system-check", label: "Ignition system check", price: 1099 },
  { value: "sensor-diagnostics", label: "Sensor and ECU diagnostics", price: 1499 },
  { value: "overheating-diagnosis", label: "Overheating diagnosis", price: 1199 },
  { value: "engine-noise-check", label: "Engine noise inspection", price: 999 },
  { value: "compression-test", label: "Compression test", price: 1599 },
  { value: "advanced-engine-scan", label: "Advanced engine diagnostics", price: 1999 },
];

const carEmergencyOptions = [
  { value: "accident-scene", label: "Accident scene assistance", price: 0 },
  { value: "medical-emergency", label: "Medical emergency support", price: 0 },
  { value: "police-help", label: "Police assistance needed", price: 0 },
  { value: "vehicle-stuck", label: "Vehicle stuck in unsafe area", price: 0 },
  { value: "night-breakdown", label: "Night-time emergency breakdown", price: 0 },
  { value: "family-safety", label: "Family or passenger safety concern", price: 0 },
  { value: "tow-priority", label: "Priority towing coordination", price: 0 },
  { value: "ambulance-help", label: "Ambulance coordination needed", price: 0 },
];

const bikeEmergencyOptions = [
  { value: "accident-scene", label: "Bike accident scene assistance", price: 0 },
  { value: "medical-emergency", label: "Medical emergency support", price: 0 },
  { value: "police-help", label: "Police assistance needed", price: 0 },
  { value: "unsafe-location", label: "Stuck in unsafe location", price: 0 },
  { value: "night-breakdown", label: "Night-time bike breakdown", price: 0 },
  { value: "injury-support", label: "Rider injury support", price: 0 },
  { value: "pickup-priority", label: "Priority pickup coordination", price: 0 },
  { value: "hospital-help", label: "Hospital coordination needed", price: 0 },
];

const bikeMobileMechanicOptions = [
  { value: "none", label: "No mechanic option selected", price: 0 },
  { value: "starting-issue", label: "Starting issue inspection", price: 249 },
  { value: "battery-wiring", label: "Battery and wiring check", price: 299 },
  { value: "engine-tuning", label: "Engine tuning support", price: 499 },
  { value: "clutch-adjustment", label: "Clutch adjustment", price: 299 },
  { value: "gear-shifting", label: "Gear shifting diagnosis", price: 349 },
  { value: "chain-sprocket", label: "Chain and sprocket inspection", price: 249 },
  { value: "spark-plug", label: "Spark plug check", price: 199 },
  { value: "brake-adjustment", label: "Brake adjustment", price: 249 },
  { value: "suspension-inspection", label: "Suspension inspection", price: 399 },
  { value: "electrical-diagnosis", label: "Electrical diagnosis", price: 449 },
  { value: "general-breakdown", label: "General breakdown diagnosis", price: 349 },
];

const bikeBatteryServiceOptions = [
  { value: "none", label: "No battery option selected", price: 0 },
  { value: "jump-start", label: "Jump-start support", price: 249 },
  { value: "battery-health", label: "Battery health check", price: 199 },
  { value: "charging-check", label: "Charging system inspection", price: 299 },
  { value: "terminal-cleaning", label: "Terminal cleaning", price: 149 },
  { value: "wiring-check", label: "Battery wiring check", price: 249 },
  { value: "replacement-support", label: "Battery replacement support", price: 349 },
];

const bikeChainBrakeOptions = [
  { value: "none", label: "No chain or brake option selected", price: 0 },
  { value: "chain-adjustment", label: "Chain adjustment", price: 199 },
  { value: "chain-clean-lube", label: "Chain clean and lube", price: 249 },
  { value: "sprocket-check", label: "Sprocket inspection", price: 299 },
  { value: "front-brake-adjustment", label: "Front brake adjustment", price: 249 },
  { value: "rear-brake-adjustment", label: "Rear brake adjustment", price: 249 },
  { value: "brake-pad-check", label: "Brake pad inspection", price: 199 },
  { value: "cable-check", label: "Brake cable check", price: 179 },
  { value: "full-chain-brake-inspection", label: "Full chain and brake inspection", price: 449 },
];

const bikeSuspensionOptions = [
  { value: "none", label: "No suspension option selected", price: 0 },
  { value: "front-fork-check", label: "Front fork inspection", price: 299 },
  { value: "rear-shock-check", label: "Rear shock inspection", price: 299 },
  { value: "oil-leak-check", label: "Suspension oil leak check", price: 349 },
  { value: "ride-balance-check", label: "Ride balance inspection", price: 249 },
  { value: "steering-alignment", label: "Steering alignment check", price: 299 },
  { value: "full-suspension-inspection", label: "Full suspension inspection", price: 499 },
];

const bikeClutchGearOptions = [
  { value: "none", label: "No clutch or gear option selected", price: 0 },
  { value: "clutch-adjustment", label: "Clutch adjustment", price: 249 },
  { value: "clutch-cable-check", label: "Clutch cable check", price: 199 },
  { value: "gear-shifting-check", label: "Gear shifting diagnosis", price: 299 },
  { value: "lever-inspection", label: "Clutch lever inspection", price: 149 },
  { value: "gear-pedal-check", label: "Gear pedal inspection", price: 179 },
  { value: "transmission-support", label: "Transmission support inspection", price: 449 },
  { value: "full-clutch-gear-check", label: "Full clutch and gear inspection", price: 499 },
];

const bikePickupDropOptions = [
  { value: "none", label: "No pickup option selected", price: 0 },
  { value: "nearby-pickup", label: "Nearby pickup and workshop drop", price: 149 },
  { value: "same-area-drop", label: "Same-area bike drop", price: 199 },
  { value: "doorstep-pickup", label: "Doorstep pickup support", price: 249 },
  { value: "priority-pickup", label: "Priority pickup coordination", price: 299 },
  { value: "inspection-drop", label: "Pickup for inspection and drop", price: 349 },
  { value: "repair-workshop-drop", label: "Repair workshop drop", price: 399 },
];

const bikeEngineJobOptions = [
  { value: "none", label: "No engine job option selected", price: 0 },
  { value: "engine-tuning", label: "Engine tuning support", price: 449 },
  { value: "starting-problem", label: "Starting problem diagnosis", price: 349 },
  { value: "pickup-loss", label: "Pickup loss inspection", price: 399 },
  { value: "smoke-check", label: "Smoke and combustion check", price: 499 },
  { value: "noise-inspection", label: "Engine noise inspection", price: 449 },
  { value: "oil-leak-check", label: "Engine oil leak check", price: 399 },
  { value: "overheating-check", label: "Overheating inspection", price: 499 },
  { value: "carb-fuel-check", label: "Carburetor or fuel line check", price: 349 },
  { value: "compression-check", label: "Compression check", price: 599 },
  { value: "full-engine-diagnosis", label: "Full engine diagnosis", price: 799 },
];

function ServicePageV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleType = location.state?.vehicleType || "Car";
  const serviceType = location.state?.serviceType || "Mechanic";
  const serviceLabel = location.state?.serviceLabel || serviceType;
  const presetFuelType = location.state?.fuelType || "";
  const presetProblem = location.state?.presetProblem || "";
  const isRoadsideRepair = serviceType === "Roadside Repair";
  const isBatteryJumpStart = serviceLabel === "Battery Jump Start" || serviceLabel === "Battery Service";
  const isLockoutAssistance = serviceLabel === "Lockout Assistance";
  const isTowingService = serviceLabel === "Towing & Recovery";
  const isDetailing = serviceType === "Detailing";
  const isHealthCheck =
    serviceLabel === "Health Check-Up" || serviceLabel === "Vehicle Health Check-Up";
  const isEngineDiagnostics = serviceLabel === "Engine Diagnostics";
  const isSosEmergency = serviceType === "SOS Emergency";
  const isBikeMobileMechanic = serviceLabel === "Mobile Mechanic" && vehicleType === "Bike";
  const isBikeBatteryService = serviceLabel === "Battery Service" && vehicleType === "Bike";
  const isBikeChainBrakeRepair = serviceLabel === "Chain & Brake Repair" && vehicleType === "Bike";
  const isBikeSuspensionCheck = serviceLabel === "Suspension Check" && vehicleType === "Bike";
  const isBikeClutchGearSupport = serviceLabel === "Clutch & Gear Support" && vehicleType === "Bike";
  const isBikePickupDrop = serviceLabel === "Pickup & Workshop Drop" && vehicleType === "Bike";
  const isBikeEngineJobs = serviceLabel === "Engine Jobs" && vehicleType === "Bike";
  const isEvCharging = serviceType === "EV Charging";
  const isFuelDelivery = serviceType === "Fuel Delivery";
  const isWashingAndCleaning = serviceType === "Washing & Cleaning";
  const isTyreService = serviceType === "Tyre Services";
  const isAcCheckAndCooling = serviceLabel === "AC Check & Cooling";
  const optionalServicesDisabled = isEvCharging || isFuelDelivery || isSosEmergency;

  const [selectedExtras, setSelectedExtras] = useState([]);
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [locationText, setLocationText] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [problem, setProblem] = useState(presetProblem);
  const [chargerCapacity, setChargerCapacity] = useState("");
  const [fuelQuantity, setFuelQuantity] = useState("");
  const [selectedRoadsideOptions, setSelectedRoadsideOptions] = useState([]);
  const [selectedWashOptions, setSelectedWashOptions] = useState([]);
  const [selectedTyreOptions, setSelectedTyreOptions] = useState([]);
  const [selectedAcOptions, setSelectedAcOptions] = useState([]);
  const [selectedLockoutOptions, setSelectedLockoutOptions] = useState([]);
  const [selectedTowingOptions, setSelectedTowingOptions] = useState([]);
  const [selectedDetailingOptions, setSelectedDetailingOptions] = useState([]);
  const [selectedHealthCheckOptions, setSelectedHealthCheckOptions] = useState([]);
  const [selectedEngineDiagnosticOptions, setSelectedEngineDiagnosticOptions] = useState([]);
  const [selectedEmergencyOptions, setSelectedEmergencyOptions] = useState([]);
  const [selectedBikeMechanicOptions, setSelectedBikeMechanicOptions] = useState([]);
  const [selectedBikeBatteryOptions, setSelectedBikeBatteryOptions] = useState([]);
  const [selectedBikeChainBrakeOptions, setSelectedBikeChainBrakeOptions] = useState([]);
  const [selectedBikeSuspensionOptions, setSelectedBikeSuspensionOptions] = useState([]);
  const [selectedBikeClutchGearOptions, setSelectedBikeClutchGearOptions] = useState([]);
  const [selectedBikePickupDropOptions, setSelectedBikePickupDropOptions] = useState([]);
  const [selectedBikeEngineJobOptions, setSelectedBikeEngineJobOptions] = useState([]);
  const nearbyService = nearbyServiceMap[serviceType] || {
    buttonLabel: `${serviceLabel} Near Me`,
    query: `${serviceLabel} near me`,
    helper: "Open nearby service providers in Google Maps.",
  };

  const evBaseVisitPrice = isEvCharging ? getEvBaseVisitPrice(vehicleType) : 0;
  const evCapacityPrice = isEvCharging ? getEvCapacityPrice(chargerCapacity, vehicleType) : 0;
  const fuelDeliveryFee = isFuelDelivery ? getFuelDeliveryFee(vehicleType) : 0;
  const fuelRatePerLitre = isFuelDelivery ? getFuelRatePerLitre(presetFuelType) : 0;
  const fuelLitres = isFuelDelivery ? parseNumericInput(fuelQuantity) : 0;
  const fuelCost = isFuelDelivery ? Math.round(fuelRatePerLitre * fuelLitres) : 0;
  const activeRoadsideOptions =
    vehicleType === "Bike" ? bikeRoadsideAssistanceOptions : roadsideAssistanceOptions;
  const activeWashOptions = vehicleType === "Bike" ? bikeWashOptions : carWashOptions;
  const activeTyreOptions = vehicleType === "Bike" ? bikeTyreOptions : carTyreOptions;
  const activeAcOptions = acServiceOptions;
  const activeLockoutOptions = lockoutOptions;
  const activeTowingOptions = towingOptions;
  const activeDetailingOptions = vehicleType === "Bike" ? bikeDetailingOptions : carDetailingOptions;
  const activeHealthCheckOptions = vehicleType === "Bike" ? bikeHealthCheckOptions : carHealthCheckOptions;
  const activeEngineDiagnosticOptions = engineDiagnosticOptions;
  const activeEmergencyOptions = vehicleType === "Bike" ? bikeEmergencyOptions : carEmergencyOptions;
  const activeBikeMechanicOptions = bikeMobileMechanicOptions;
  const activeBikeBatteryOptions = bikeBatteryServiceOptions;
  const activeBikeChainBrakeOptions = bikeChainBrakeOptions;
  const activeBikeSuspensionOptions = bikeSuspensionOptions;
  const activeBikeClutchGearOptions = bikeClutchGearOptions;
  const activeBikePickupDropOptions = bikePickupDropOptions;
  const activeBikeEngineJobOptions = bikeEngineJobOptions;
  const activeRoadsideSelection = activeRoadsideOptions.filter((option) =>
    selectedRoadsideOptions.includes(option.value)
  );
  const activeWashSelection = activeWashOptions.filter((option) =>
    selectedWashOptions.includes(option.value)
  );
  const activeTyreSelection = activeTyreOptions.filter((option) =>
    selectedTyreOptions.includes(option.value)
  );
  const activeAcSelection = activeAcOptions.filter((option) =>
    selectedAcOptions.includes(option.value)
  );
  const activeLockoutSelection = activeLockoutOptions.filter((option) =>
    selectedLockoutOptions.includes(option.value)
  );
  const activeTowingSelection = activeTowingOptions.filter((option) =>
    selectedTowingOptions.includes(option.value)
  );
  const activeDetailingSelection = activeDetailingOptions.filter((option) =>
    selectedDetailingOptions.includes(option.value)
  );
  const activeHealthCheckSelection = activeHealthCheckOptions.filter((option) =>
    selectedHealthCheckOptions.includes(option.value)
  );
  const activeEngineDiagnosticSelection = activeEngineDiagnosticOptions.filter((option) =>
    selectedEngineDiagnosticOptions.includes(option.value)
  );
  const activeEmergencySelection = activeEmergencyOptions.filter((option) =>
    selectedEmergencyOptions.includes(option.value)
  );
  const activeBikeMechanicSelection = activeBikeMechanicOptions.filter((option) =>
    selectedBikeMechanicOptions.includes(option.value)
  );
  const activeBikeBatterySelection = activeBikeBatteryOptions.filter((option) =>
    selectedBikeBatteryOptions.includes(option.value)
  );
  const activeBikeChainBrakeSelection = activeBikeChainBrakeOptions.filter((option) =>
    selectedBikeChainBrakeOptions.includes(option.value)
  );
  const activeBikeSuspensionSelection = activeBikeSuspensionOptions.filter((option) =>
    selectedBikeSuspensionOptions.includes(option.value)
  );
  const activeBikeClutchGearSelection = activeBikeClutchGearOptions.filter((option) =>
    selectedBikeClutchGearOptions.includes(option.value)
  );
  const activeBikePickupDropSelection = activeBikePickupDropOptions.filter((option) =>
    selectedBikePickupDropOptions.includes(option.value)
  );
  const activeBikeEngineJobSelection = activeBikeEngineJobOptions.filter((option) =>
    selectedBikeEngineJobOptions.includes(option.value)
  );
  const roadsideAssistancePrice = isRoadsideRepair
    ? activeRoadsideSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const washPackagePrice = isWashingAndCleaning
    ? activeWashSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const tyreServicePrice = isTyreService
    ? activeTyreSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const acServicePrice = isAcCheckAndCooling
    ? activeAcSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const lockoutServicePrice = isLockoutAssistance
    ? activeLockoutSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const towingServicePrice = isTowingService
    ? activeTowingSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const detailingServicePrice = isDetailing
    ? activeDetailingSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const healthCheckPrice = isHealthCheck
    ? activeHealthCheckSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const engineDiagnosticPrice = isEngineDiagnostics
    ? activeEngineDiagnosticSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const emergencyServicePrice = 0;
  const bikeMechanicPrice = isBikeMobileMechanic
    ? activeBikeMechanicSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikeBatteryPrice = isBikeBatteryService
    ? activeBikeBatterySelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikeChainBrakePrice = isBikeChainBrakeRepair
    ? activeBikeChainBrakeSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikeSuspensionPrice = isBikeSuspensionCheck
    ? activeBikeSuspensionSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikeClutchGearPrice = isBikeClutchGearSupport
    ? activeBikeClutchGearSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikePickupDropPrice = isBikePickupDrop
    ? activeBikePickupDropSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const bikeEngineJobPrice = isBikeEngineJobs
    ? activeBikeEngineJobSelection.reduce((sum, option) => sum + option.price, 0)
    : 0;
  const batteryJumpStartPrice = isBatteryJumpStart ? (vehicleType === "Bike" ? 249 : 399) : 0;

  const extrasTotal = selectedExtras.reduce((sum, itemName) => {
    const extra = extras.find((item) => item.name === itemName);
    return sum + (extra?.price || 0);
  }, 0);

  const serviceSpecificPrice = isEvCharging
    ? evBaseVisitPrice + evCapacityPrice
    : isFuelDelivery
      ? fuelDeliveryFee + fuelCost
      : isRoadsideRepair
        ? roadsideAssistancePrice
        : isBatteryJumpStart
          ? batteryJumpStartPrice
          : isWashingAndCleaning
            ? washPackagePrice
            : isTyreService
              ? tyreServicePrice
              : isAcCheckAndCooling
                ? acServicePrice
                : isLockoutAssistance
                  ? lockoutServicePrice
                  : isTowingService
                    ? towingServicePrice
                    : isDetailing
                      ? detailingServicePrice
                      : isHealthCheck
                        ? healthCheckPrice
                        : isEngineDiagnostics
                          ? engineDiagnosticPrice
                          : isSosEmergency
                            ? emergencyServicePrice
                            : isBikeMobileMechanic
                              ? bikeMechanicPrice
                              : isBikeBatteryService
                                ? bikeBatteryPrice
                                : isBikeChainBrakeRepair
                                  ? bikeChainBrakePrice
                                  : isBikeSuspensionCheck
                                    ? bikeSuspensionPrice
                                    : isBikeClutchGearSupport
                                      ? bikeClutchGearPrice
                                      : isBikePickupDrop
                                        ? bikePickupDropPrice
                                        : isBikeEngineJobs
                                          ? bikeEngineJobPrice
                                      : 0;
  const total = serviceSpecificPrice + extrasTotal;

  const toggleExtra = (name) => {
    setSelectedExtras((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
    );
  };

  const toggleSelection = (value, setter) => {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const renderMultiSelectDropdown = (label, options, selectedValues, setter) => {
    const selectedLabels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);

    return (
      <div className="field">
        <label>{label}</label>
        <details
          className="list-card"
          style={{
            padding: "16px 18px",
            cursor: "pointer",
          }}
        >
          <summary
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              fontWeight: 600,
            }}
          >
            <span>
              {selectedLabels.length
                ? `${selectedLabels.length} option${selectedLabels.length > 1 ? "s" : ""} selected`
                : `Select ${label.toLowerCase()}`}
            </span>
            <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
              {selectedLabels.length ? selectedLabels.join(", ") : "Choose options"}
            </span>
          </summary>

          <div className="stack" style={{ marginTop: "14px" }}>
            {options
              .filter((option) => option.value !== "none")
              .map((option) => {
                const active = selectedValues.includes(option.value);

                return (
                  <label
                    key={option.value}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: active ? "1px solid rgba(45, 102, 220, 0.28)" : "1px solid var(--line)",
                      background: active
                        ? "linear-gradient(180deg, rgba(239, 245, 255, 0.96), rgba(248, 251, 255, 0.98))"
                        : "rgba(255, 255, 255, 0.72)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleSelection(option.value, setter)}
                      style={{
                        marginTop: "3px",
                        width: "16px",
                        height: "16px",
                        accentColor: "var(--accent)",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>{option.label}</div>
                      <div className="feature-copy">Rs {option.price.toLocaleString("en-IN")}</div>
                    </div>
                  </label>
                );
              })}
          </div>
        </details>
      </div>
    );
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setLocationText(`Lat ${lat}, Lng ${lng}`);
      },
      () => {
        alert("Unable to detect your location.");
      }
    );
  };

  const openNearbySearch = () => {
    const encodedQuery = encodeURIComponent(nearbyService.query);
    window.open(`https://www.google.com/maps/search/${encodedQuery}`, "_blank", "noopener,noreferrer");
  };

  const continueToRequest = () => {
    navigate("/service-request", {
      state: {
        serviceType,
        serviceLabel,
        vehicleType,
        fuelType: isFuelDelivery ? presetFuelType : "",
        packageName: "",
        packagePrice: 0,
        price: total,
        problem,
        location: locationText,
        date: scheduleType === "later" ? scheduleDate : "",
        timeSlot: scheduleType === "later" ? scheduleTime : "ASAP",
        selectedExtras: optionalServicesDisabled ? [] : selectedExtras,
        paymentMethod: "Pay after service",
        vehicleModel,
        chargerCapacity,
        fuelQuantity,
        roadsideAssistance: activeRoadsideSelection.map((option) => option.label).join(", "),
        washPackage: activeWashSelection.map((option) => option.label).join(", "),
        tyreOption: activeTyreSelection.map((option) => option.label).join(", "),
        acOptions: activeAcSelection.map((option) => option.label).join(", "),
        lockoutOptions: activeLockoutSelection.map((option) => option.label).join(", "),
        towingOptions: activeTowingSelection.map((option) => option.label).join(", "),
        detailingOptions: activeDetailingSelection.map((option) => option.label).join(", "),
        healthCheckOptions: activeHealthCheckSelection.map((option) => option.label).join(", "),
        engineDiagnosticOptions: activeEngineDiagnosticSelection.map((option) => option.label).join(", "),
        emergencyOptions: activeEmergencySelection.map((option) => option.label).join(", "),
        bikeMechanicOptions: activeBikeMechanicSelection.map((option) => option.label).join(", "),
        bikeBatteryOptions: activeBikeBatterySelection.map((option) => option.label).join(", "),
        bikeChainBrakeOptions: activeBikeChainBrakeSelection.map((option) => option.label).join(", "),
        bikeSuspensionOptions: activeBikeSuspensionSelection.map((option) => option.label).join(", "),
        bikeClutchGearOptions: activeBikeClutchGearSelection.map((option) => option.label).join(", "),
        bikePickupDropOptions: activeBikePickupDropSelection.map((option) => option.label).join(", "),
        bikeEngineJobOptions: activeBikeEngineJobSelection.map((option) => option.label).join(", "),
      },
    });
  };

  const openPoliceStations = () => {
    window.open(
      "https://www.google.com/maps/search/police+station+near+me",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openHospitals = () => {
    window.open(
      "https://www.google.com/maps/search/hospital+near+me",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="page-shell split-layout">
      <section className="app-grid">
        <div className="hero-card" style={{ padding: "32px" }}>
          <span className="eyebrow">{serviceLabel}</span>
          <h1 className="section-title">{serviceLabel}</h1>
          <p className="section-copy">Select the exact service options you need. Premium plans now live on the Packages page.</p>

          <div className="chip-row" style={{ marginTop: "18px" }}>
            <span className="info-chip">Vehicle: {vehicleType}</span>
            <span className="info-chip">
              ETA: {serviceType === "Fuel Delivery" ? "15-25 min" : "10-20 min"}
            </span>
            {isFuelDelivery ? <span className="info-chip">Fuel: {presetFuelType || "Select fuel"}</span> : null}
            {isEvCharging ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "Rs 249" : "Rs 399"} visit + charger capacity
              </span>
            ) : null}
            {isFuelDelivery ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "Rs 149" : "Rs 199"} delivery + fuel
              </span>
            ) : null}
            {isRoadsideRepair ? (
              <span className="info-chip">Pricing: basic roadside assistance from Rs 499</span>
            ) : null}
            {isBatteryJumpStart ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "Rs 249" : "Rs 399"} jump-start estimate
              </span>
            ) : null}
            {isLockoutAssistance ? (
              <span className="info-chip">Pricing: lockout options from Rs 249</span>
            ) : null}
            {isTowingService ? (
              <span className="info-chip">Pricing: towing options from Rs 1,499</span>
            ) : null}
            {isDetailing ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "bike detailing from Rs 249" : "car detailing from Rs 999"}
              </span>
            ) : null}
            {isHealthCheck ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "bike health checks from Rs 199" : "car health checks from Rs 399"}
              </span>
            ) : null}
            {isEngineDiagnostics ? (
              <span className="info-chip">Pricing: engine diagnostics from Rs 899</span>
            ) : null}
            {isSosEmergency ? (
              <span className="info-chip">Pricing: emergency support is free of cost</span>
            ) : null}
            {isBikeMobileMechanic ? (
              <span className="info-chip">Pricing: bike mechanic options from Rs 199</span>
            ) : null}
            {isBikeBatteryService ? (
              <span className="info-chip">Pricing: battery service options from Rs 149</span>
            ) : null}
            {isBikeChainBrakeRepair ? (
              <span className="info-chip">Pricing: chain and brake options from Rs 179</span>
            ) : null}
            {isBikeSuspensionCheck ? (
              <span className="info-chip">Pricing: suspension options from Rs 249</span>
            ) : null}
            {isBikeClutchGearSupport ? (
              <span className="info-chip">Pricing: clutch and gear options from Rs 149</span>
            ) : null}
            {isBikePickupDrop ? (
              <span className="info-chip">Pricing: pickup and drop options from Rs 149</span>
            ) : null}
            {isBikeEngineJobs ? (
              <span className="info-chip">Pricing: engine job options from Rs 349</span>
            ) : null}
            {isTyreService ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "bike tyre support from Rs 99" : "car tyre support from Rs 149"}
              </span>
            ) : null}
            {isAcCheckAndCooling ? (
              <span className="info-chip">Pricing: AC support options from Rs 299</span>
            ) : null}
            {isWashingAndCleaning ? (
              <span className="info-chip">
                Pricing: {vehicleType === "Bike" ? "bike cleaning options from Rs 149" : "car cleaning options from Rs 299"}
              </span>
            ) : null}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid var(--line)",
              background: "rgba(255, 255, 255, 0.68)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 6px" }}>Nearby help</h3>
                <p className="section-copy">{nearbyService.helper}</p>
                <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: "0.92rem" }}>
                  Google Maps: {nearbyService.query}
                </p>
              </div>

              <div className="inline-actions">
                <button type="button" className="secondary-btn" onClick={() => navigate("/packages")}>
                  View Premium Packages
                </button>
                <button type="button" className="secondary-btn" onClick={openNearbySearch}>
                  {nearbyService.buttonLabel}
                </button>
                {isSosEmergency ? (
                  <>
                    <button type="button" className="secondary-btn" onClick={openPoliceStations}>
                      Police Station Near Me
                    </button>
                    <button type="button" className="secondary-btn" onClick={openHospitals}>
                      Hospital Near Me
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "28px" }}>
          <div className="stack">
            <div className="grid-two">
              <div className="field">
                <label htmlFor="vehicle-model">Vehicle Model</label>
                <input
                  id="vehicle-model"
                  value={vehicleModel}
                  onChange={(event) => setVehicleModel(event.target.value)}
                  placeholder="Example: Hyundai i20"
                />
              </div>

              <div className="field">
                <label htmlFor="location">Pickup or breakdown location</label>
                <input
                  id="location"
                  value={locationText}
                  onChange={(event) => setLocationText(event.target.value)}
                  placeholder="Enter address or coordinates"
                />
              </div>
            </div>

            <div className="inline-actions">
              <button type="button" className="ghost-btn" onClick={detectLocation}>
                Use Current Location
              </button>
            </div>

            <div className="field">
              <label htmlFor="problem">Problem description</label>
              <textarea
                id="problem"
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                placeholder="What happened, what you hear, and what support you need."
              />
            </div>

            {isRoadsideRepair ? (
              renderMultiSelectDropdown(
                "Roadside assistance options",
                activeRoadsideOptions,
                selectedRoadsideOptions,
                setSelectedRoadsideOptions
              )
            ) : null}

            {isWashingAndCleaning ? (
              renderMultiSelectDropdown(
                "Cleaning options",
                activeWashOptions,
                selectedWashOptions,
                setSelectedWashOptions
              )
            ) : null}

            {isTyreService ? (
              renderMultiSelectDropdown(
                "Tyre service options",
                activeTyreOptions,
                selectedTyreOptions,
                setSelectedTyreOptions
              )
            ) : null}

            {isAcCheckAndCooling ? (
              renderMultiSelectDropdown(
                "AC service options",
                activeAcOptions,
                selectedAcOptions,
                setSelectedAcOptions
              )
            ) : null}

            {isLockoutAssistance ? (
              renderMultiSelectDropdown(
                "Lockout assistance options",
                activeLockoutOptions,
                selectedLockoutOptions,
                setSelectedLockoutOptions
              )
            ) : null}

            {isTowingService ? (
              renderMultiSelectDropdown(
                "Towing options",
                activeTowingOptions,
                selectedTowingOptions,
                setSelectedTowingOptions
              )
            ) : null}

            {isDetailing ? (
              renderMultiSelectDropdown(
                "Detailing options",
                activeDetailingOptions,
                selectedDetailingOptions,
                setSelectedDetailingOptions
              )
            ) : null}

            {isHealthCheck ? (
              renderMultiSelectDropdown(
                "Health check options",
                activeHealthCheckOptions,
                selectedHealthCheckOptions,
                setSelectedHealthCheckOptions
              )
            ) : null}

            {isEngineDiagnostics ? (
              renderMultiSelectDropdown(
                "Engine diagnostic options",
                activeEngineDiagnosticOptions,
                selectedEngineDiagnosticOptions,
                setSelectedEngineDiagnosticOptions
              )
            ) : null}

            {isSosEmergency ? (
              renderMultiSelectDropdown(
                "Emergency support options",
                activeEmergencyOptions,
                selectedEmergencyOptions,
                setSelectedEmergencyOptions
              )
            ) : null}

            {isBikeMobileMechanic ? (
              renderMultiSelectDropdown(
                "Bike mechanic options",
                activeBikeMechanicOptions,
                selectedBikeMechanicOptions,
                setSelectedBikeMechanicOptions
              )
            ) : null}

            {isBikeBatteryService ? (
              renderMultiSelectDropdown(
                "Battery service options",
                activeBikeBatteryOptions,
                selectedBikeBatteryOptions,
                setSelectedBikeBatteryOptions
              )
            ) : null}

            {isBikeChainBrakeRepair ? (
              renderMultiSelectDropdown(
                "Chain and brake options",
                activeBikeChainBrakeOptions,
                selectedBikeChainBrakeOptions,
                setSelectedBikeChainBrakeOptions
              )
            ) : null}

            {isBikeSuspensionCheck ? (
              renderMultiSelectDropdown(
                "Suspension options",
                activeBikeSuspensionOptions,
                selectedBikeSuspensionOptions,
                setSelectedBikeSuspensionOptions
              )
            ) : null}

            {isBikeClutchGearSupport ? (
              renderMultiSelectDropdown(
                "Clutch and gear options",
                activeBikeClutchGearOptions,
                selectedBikeClutchGearOptions,
                setSelectedBikeClutchGearOptions
              )
            ) : null}

            {isBikePickupDrop ? (
              renderMultiSelectDropdown(
                "Pickup and drop options",
                activeBikePickupDropOptions,
                selectedBikePickupDropOptions,
                setSelectedBikePickupDropOptions
              )
            ) : null}

            {isBikeEngineJobs ? (
              renderMultiSelectDropdown(
                "Engine job options",
                activeBikeEngineJobOptions,
                selectedBikeEngineJobOptions,
                setSelectedBikeEngineJobOptions
              )
            ) : null}

            <div className={isEvCharging || isFuelDelivery ? "grid-two" : "field"}>
              <div className="field">
                <label htmlFor="schedule-type">When do you need help?</label>
                <select
                  id="schedule-type"
                  value={scheduleType}
                  onChange={(event) => setScheduleType(event.target.value)}
                >
                  <option value="now">Right now</option>
                  <option value="later">Schedule for later</option>
                </select>
              </div>

              {isEvCharging ? (
                <div className="field">
                  <label htmlFor="charger-capacity">Charger type / capacity (kW)</label>
                  <input
                    id="charger-capacity"
                    value={chargerCapacity}
                    onChange={(event) => setChargerCapacity(event.target.value)}
                    placeholder="Example: CCS2 30kW"
                  />
                </div>
              ) : null}

              {isFuelDelivery ? (
                <div className="field">
                  <label htmlFor="fuel-quantity">Fuel quantity (litres)</label>
                  <input
                    id="fuel-quantity"
                    value={fuelQuantity}
                    onChange={(event) => setFuelQuantity(event.target.value)}
                    placeholder="Example: 5"
                    inputMode="decimal"
                  />
                </div>
              ) : null}

              {scheduleType === "later" ? (
                <>
                  <div className="field">
                    <label htmlFor="schedule-date">Date</label>
                    <input
                      id="schedule-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(event) => setScheduleDate(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="schedule-time">Time</label>
                    <input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(event) => setScheduleTime(event.target.value)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {!optionalServicesDisabled ? (
          <div className="surface-card" style={{ padding: "28px" }}>
            <h2 style={{ marginTop: 0 }}>Add optional services</h2>
            <div className="dashboard-grid">
              {extras.map((item) => {
                const active = selectedExtras.includes(item.name);

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleExtra(item.name)}
                    className="list-card"
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      borderColor: active ? "rgba(45, 102, 220, 0.28)" : "var(--line)",
                      background: active
                        ? "linear-gradient(180deg, rgba(239, 245, 255, 0.96), rgba(248, 251, 255, 0.98))"
                        : undefined,
                    }}
                  >
                    <h3 className="feature-title">{item.name}</h3>
                    <p className="feature-copy">Rs {item.price.toLocaleString("en-IN")}</p>
                    <div className="feature-meta">
                      <span>{active ? "Added" : "Tap to include"}</span>
                      <span className="feature-tag">{active ? "Selected" : "Optional"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      <aside className="summary-card">
        <span className="eyebrow" style={{ color: "var(--accent-strong)", background: "var(--accent-soft)" }}>
          Request Summary
        </span>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', marginBottom: "8px" }}>{serviceLabel}</h2>
        <p>{vehicleModel || vehicleType}</p>

        <div className="stack" style={{ marginTop: "20px" }}>
          {isEvCharging ? (
            <>
              <div>
                <strong>Visit fee</strong>
                <p>Rs {evBaseVisitPrice.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <strong>Capacity fee</strong>
                <p>{evCapacityPrice ? `Rs ${evCapacityPrice.toLocaleString("en-IN")}` : "Enter charger kW"}</p>
              </div>
            </>
          ) : null}
          {isFuelDelivery ? (
            <>
              <div>
                <strong>Delivery fee</strong>
                <p>Rs {fuelDeliveryFee.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <strong>Fuel rate</strong>
                <p>
                  {fuelRatePerLitre
                    ? `Rs ${fuelRatePerLitre.toLocaleString("en-IN")} per litre`
                    : "Select fuel type"}
                </p>
              </div>
              <div>
                <strong>Fuel quantity</strong>
                <p>{fuelQuantity || "Not specified yet"}</p>
              </div>
              <div>
                <strong>Fuel cost</strong>
                <p>{fuelCost ? `Rs ${fuelCost.toLocaleString("en-IN")}` : "Enter litres"}</p>
              </div>
            </>
          ) : null}
          {isRoadsideRepair ? (
            <>
              <div>
                <strong>Roadside support</strong>
                <p>{activeRoadsideSelection.length ? activeRoadsideSelection.map((option) => option.label).join(", ") : "No assistance add-on"}</p>
              </div>
              <div>
                <strong>Estimate</strong>
                <p>
                  {roadsideAssistancePrice
                    ? `Rs ${roadsideAssistancePrice.toLocaleString("en-IN")}`
                    : "Select assistance option"}
                </p>
              </div>
            </>
          ) : null}
          {isBatteryJumpStart ? (
            <>
              <div>
                <strong>Jump-start service</strong>
                <p>{vehicleType === "Bike" ? "Bike battery jump-start" : "Car battery jump-start"}</p>
              </div>
              <div>
                <strong>Estimate</strong>
                <p>Rs {batteryJumpStartPrice.toLocaleString("en-IN")}</p>
              </div>
            </>
          ) : null}
          {isLockoutAssistance ? (
            <>
              <div>
                <strong>Lockout assistance</strong>
                <p>
                  {activeLockoutSelection.length
                    ? activeLockoutSelection.map((option) => option.label).join(", ")
                    : "No lockout option selected"}
                </p>
              </div>
              <div>
                <strong>Lockout estimate</strong>
                <p>
                  {lockoutServicePrice
                    ? `Rs ${lockoutServicePrice.toLocaleString("en-IN")}`
                    : "Select lockout option"}
                </p>
              </div>
            </>
          ) : null}
          {isTowingService ? (
            <>
              <div>
                <strong>Towing service</strong>
                <p>
                  {activeTowingSelection.length
                    ? activeTowingSelection.map((option) => option.label).join(", ")
                    : "No towing option selected"}
                </p>
              </div>
              <div>
                <strong>Towing estimate</strong>
                <p>
                  {towingServicePrice
                    ? `Rs ${towingServicePrice.toLocaleString("en-IN")}`
                    : "Select towing option"}
                </p>
              </div>
            </>
          ) : null}
          {isDetailing ? (
            <>
              <div>
                <strong>Detailing service</strong>
                <p>
                  {activeDetailingSelection.length
                    ? activeDetailingSelection.map((option) => option.label).join(", ")
                    : "No detailing option selected"}
                </p>
              </div>
              <div>
                <strong>Detailing estimate</strong>
                <p>
                  {detailingServicePrice
                    ? `Rs ${detailingServicePrice.toLocaleString("en-IN")}`
                    : "Select detailing option"}
                </p>
              </div>
            </>
          ) : null}
          {isHealthCheck ? (
            <>
              <div>
                <strong>Health check</strong>
                <p>
                  {activeHealthCheckSelection.length
                    ? activeHealthCheckSelection.map((option) => option.label).join(", ")
                    : "No health check option selected"}
                </p>
              </div>
              <div>
                <strong>Health check estimate</strong>
                <p>
                  {healthCheckPrice
                    ? `Rs ${healthCheckPrice.toLocaleString("en-IN")}`
                    : "Select health check option"}
                </p>
              </div>
            </>
          ) : null}
          {isEngineDiagnostics ? (
            <>
              <div>
                <strong>Engine diagnostics</strong>
                <p>
                  {activeEngineDiagnosticSelection.length
                    ? activeEngineDiagnosticSelection.map((option) => option.label).join(", ")
                    : "No engine diagnostic option selected"}
                </p>
              </div>
              <div>
                <strong>Engine diagnostic estimate</strong>
                <p>
                  {engineDiagnosticPrice
                    ? `Rs ${engineDiagnosticPrice.toLocaleString("en-IN")}`
                    : "Select diagnostic option"}
                </p>
              </div>
            </>
          ) : null}
          {isSosEmergency ? (
            <>
              <div>
                <strong>Emergency support</strong>
                <p>
                  {activeEmergencySelection.length
                    ? activeEmergencySelection.map((option) => option.label).join(", ")
                    : "No emergency option selected"}
                </p>
              </div>
              <div>
                <strong>Emergency estimate</strong>
                <p>Free of cost</p>
              </div>
            </>
          ) : null}
          {isBikeMobileMechanic ? (
            <>
              <div>
                <strong>Bike mechanic support</strong>
                <p>
                  {activeBikeMechanicSelection.length
                    ? activeBikeMechanicSelection.map((option) => option.label).join(", ")
                    : "No mechanic option selected"}
                </p>
              </div>
              <div>
                <strong>Mechanic estimate</strong>
                <p>
                  {bikeMechanicPrice
                    ? `Rs ${bikeMechanicPrice.toLocaleString("en-IN")}`
                    : "Select mechanic option"}
                </p>
              </div>
            </>
          ) : null}
          {isBikeBatteryService ? (
            <>
              <div>
                <strong>Battery service</strong>
                <p>
                  {activeBikeBatterySelection.length
                    ? activeBikeBatterySelection.map((option) => option.label).join(", ")
                    : "No battery option selected"}
                </p>
              </div>
              <div>
                <strong>Battery estimate</strong>
                <p>{bikeBatteryPrice ? `Rs ${bikeBatteryPrice.toLocaleString("en-IN")}` : "Select battery option"}</p>
              </div>
            </>
          ) : null}
          {isBikeChainBrakeRepair ? (
            <>
              <div>
                <strong>Chain and brake service</strong>
                <p>
                  {activeBikeChainBrakeSelection.length
                    ? activeBikeChainBrakeSelection.map((option) => option.label).join(", ")
                    : "No chain or brake option selected"}
                </p>
              </div>
              <div>
                <strong>Chain and brake estimate</strong>
                <p>{bikeChainBrakePrice ? `Rs ${bikeChainBrakePrice.toLocaleString("en-IN")}` : "Select chain or brake option"}</p>
              </div>
            </>
          ) : null}
          {isBikeSuspensionCheck ? (
            <>
              <div>
                <strong>Suspension service</strong>
                <p>
                  {activeBikeSuspensionSelection.length
                    ? activeBikeSuspensionSelection.map((option) => option.label).join(", ")
                    : "No suspension option selected"}
                </p>
              </div>
              <div>
                <strong>Suspension estimate</strong>
                <p>{bikeSuspensionPrice ? `Rs ${bikeSuspensionPrice.toLocaleString("en-IN")}` : "Select suspension option"}</p>
              </div>
            </>
          ) : null}
          {isBikeClutchGearSupport ? (
            <>
              <div>
                <strong>Clutch and gear service</strong>
                <p>
                  {activeBikeClutchGearSelection.length
                    ? activeBikeClutchGearSelection.map((option) => option.label).join(", ")
                    : "No clutch or gear option selected"}
                </p>
              </div>
              <div>
                <strong>Clutch and gear estimate</strong>
                <p>{bikeClutchGearPrice ? `Rs ${bikeClutchGearPrice.toLocaleString("en-IN")}` : "Select clutch or gear option"}</p>
              </div>
            </>
          ) : null}
          {isBikePickupDrop ? (
            <>
              <div>
                <strong>Pickup and drop service</strong>
                <p>
                  {activeBikePickupDropSelection.length
                    ? activeBikePickupDropSelection.map((option) => option.label).join(", ")
                    : "No pickup option selected"}
                </p>
              </div>
              <div>
                <strong>Pickup and drop estimate</strong>
                <p>{bikePickupDropPrice ? `Rs ${bikePickupDropPrice.toLocaleString("en-IN")}` : "Select pickup option"}</p>
              </div>
            </>
          ) : null}
          {isBikeEngineJobs ? (
            <>
              <div>
                <strong>Engine jobs</strong>
                <p>
                  {activeBikeEngineJobSelection.length
                    ? activeBikeEngineJobSelection.map((option) => option.label).join(", ")
                    : "No engine job option selected"}
                </p>
              </div>
              <div>
                <strong>Engine job estimate</strong>
                <p>{bikeEngineJobPrice ? `Rs ${bikeEngineJobPrice.toLocaleString("en-IN")}` : "Select engine job option"}</p>
              </div>
            </>
          ) : null}
          {isTyreService ? (
            <>
              <div>
                <strong>Tyre service</strong>
                <p>{activeTyreSelection.length ? activeTyreSelection.map((option) => option.label).join(", ") : "No tyre option selected"}</p>
              </div>
              <div>
                <strong>Tyre estimate</strong>
                <p>
                  {tyreServicePrice
                    ? `Rs ${tyreServicePrice.toLocaleString("en-IN")}`
                    : "Select tyre option"}
                </p>
              </div>
            </>
          ) : null}
          {isAcCheckAndCooling ? (
            <>
              <div>
                <strong>AC service</strong>
                <p>{activeAcSelection.length ? activeAcSelection.map((option) => option.label).join(", ") : "No AC option selected"}</p>
              </div>
              <div>
                <strong>AC estimate</strong>
                <p>
                  {acServicePrice
                    ? `Rs ${acServicePrice.toLocaleString("en-IN")}`
                    : "Select AC option"}
                </p>
              </div>
            </>
          ) : null}
          {isWashingAndCleaning ? (
            <>
              <div>
                <strong>Cleaning options</strong>
                <p>{activeWashSelection.length ? activeWashSelection.map((option) => option.label).join(", ") : "No cleaning option selected"}</p>
              </div>
              <div>
                <strong>Estimate</strong>
                <p>
                  {washPackagePrice
                    ? `Rs ${washPackagePrice.toLocaleString("en-IN")}`
                    : "Select cleaning options"}
                </p>
              </div>
            </>
          ) : null}
          <div>
            <strong>Extras</strong>
            <p>
              {optionalServicesDisabled
                ? "Not available for this service"
                : selectedExtras.length
                  ? selectedExtras.join(", ")
                  : "No extras selected yet"}
            </p>
          </div>
          {isEvCharging ? (
            <div>
              <strong>Charger</strong>
              <p>{chargerCapacity || "Not specified yet"}</p>
            </div>
          ) : null}
          <div>
            <strong>Total</strong>
            <p style={{ color: "var(--accent)", fontSize: "1.8rem", fontWeight: 800 }}>
              Rs {total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="inline-actions" style={{ marginTop: "24px" }}>
          <button type="button" className="primary-btn" onClick={continueToRequest}>
            Continue to Request
          </button>
        </div>
      </aside>
    </main>
  );
}

export default ServicePageV2;
