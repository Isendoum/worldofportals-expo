const latRange = 100;
const longRange = 50;

export const generateRandomCoordinates = (
  latitude: number,
  longitude: number
) => {
  const y0 = latitude;
  const x0 = longitude;

  // Convert meters to degrees
  const latChange = latRange / 111300; // roughly 111.3km per degree for latitude
  const lonChange = longRange / (111300 * Math.cos((Math.PI * y0) / 180)); // Adjust for latitude in longitude calculation

  // Generate random changes within the constraints
  const randomLatChange = (Math.random() - 0.5) * 2 * latChange; // -200m to +200m
  const randomLonChange = (Math.random() - 0.5) * 2 * lonChange; // -100m to +100m

  const newLat = y0 + randomLatChange;
  const newLon = x0 + randomLonChange;

  return {
    latitude: newLat,
    longitude: newLon,
  };
};
