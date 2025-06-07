export const config = {
	apiUrl: location.hostname === "localhost" ? "http://localhost:3005" : "/api",
	googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
};
