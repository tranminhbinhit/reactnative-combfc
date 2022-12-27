export function findEnumById(type, id) {
  const result = Object.keys(type).filter(
    key => type[key].id === parseInt(id, 10),
  );
  if (result) {
    return type[result[0]];
  }
  return {};
}

export function genEnumToOption(type) {
  return Object.keys(type).map(item => ({
    value: type[item].value,
    label: type[item].label,
  }));
}

export const EnumPermission = {
  ACCESS_FINE_LOCATION: {
    id: 1,
    value: 'ACCESS_FINE_LOCATION',
    label: 'vị trí',
  },
  CAMERA: {
    id: 2,
    value: 'CAMERA',
    label: 'máy ảnh',
  },
  INTERNET: {
    id: 2,
    value: 'INTERNET',
    label: 'internet',
  },
};

export const EnumGender = {
  FEMALE: {
    id: 0,
    value: 0,
    label: 'Nữ',
  },
  MALE: {
    id: 1,
    value: 1,
    label: 'Nam',
  },
  ORDER: {
    id: 2,
    value: 2,
    label: 'Nữ',
  },
};

export const EnumDateType = {
  TODAY: 1,
  YESTERDAY: 2,
  DATE7: 3,
  DATE30: 4,
  THISMOUNTH: 5,
  PREVMOUNTH: 6,
};
