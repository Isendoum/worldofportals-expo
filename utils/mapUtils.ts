// generates in radius of at most 1km
// export const generateRandomCoordinates = (
//   latitude: number,
//   longitude: number,
//   radius: number
// ) => {
//   const y0 = latitude;
//   const x0 = longitude;
//   const rd = radius / 111300; // roughly 111.3km per degree

//   const u = Math.random();
//   const v = Math.random();

//   const w = rd * Math.sqrt(u);
//   const t = 2 * Math.PI * v;
//   const x = w * Math.cos(t);
//   const y = w * Math.sin(t);

//   const newLat = y + y0;
//   const newLon = x + x0;

//   return {
//     latitude: newLat,
//     longitude: newLon,
//   };
// };

export const generateRandomCoordinates = (
  latitude: number,
  longitude: number
) => {
  const y0 = latitude;
  const x0 = longitude;

  // Convert meters to degrees
  const latChange = 200 / 111300; // roughly 111.3km per degree for latitude
  const lonChange = 100 / (111300 * Math.cos((Math.PI * y0) / 180)); // Adjust for latitude in longitude calculation

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
