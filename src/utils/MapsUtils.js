export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function rad2deg(rad) {
  return rad * (180 / Math.PI);
}

export function getDistance(from, to) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(to.lat - from.lat); // deg2rad below
  const dLon = deg2rad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) *
      Math.cos(deg2rad(to.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return R * c;
}

export function getBearing(begin, end) {
  const lat = Math.abs(begin.lat - end.lat);
  const lng = Math.abs(begin.lng - end.lng);

  if (begin.lat < end.lat && begin.lng < end.lng) {
    return parseFloat(rad2deg(Math.atan(lng / lat)));
  } else if (begin.lat >= end.lat && begin.lng < end.lng) {
    return parseFloat(90 - rad2deg(Math.atan(lng / lat)) + 90);
  } else if (begin.lat >= end.lat && begin.lng >= end.lng) {
    return parseFloat(rad2deg(Math.atan(lng / lat)) + 180);
  } else if (begin.lat < end.lat && begin.lng >= end.lng) {
    return parseFloat(90 - rad2deg(Math.atan(lng / lat)) + 270);
  }
  return 0;
}
