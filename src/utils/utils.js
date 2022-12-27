import SHA256 from 'crypto-js/sha256';
import SHA1 from 'crypto-js/sha1';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import Geocoder from 'react-native-geocoding';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';

import {COMMON_CONST} from '../constants/constants';
import {findEnumById, EnumPermission} from '../constants/enum';
import CONFIG from '../config/config';

/************Format String, Object************/
export function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

export function isEmptyObject(obj) {
  if (obj !== null && obj !== undefined) return Object.keys(obj).length === 0;
  return true;
}

export function isSuccess(response) {
  return response && response.success;
}

export function getParameterByName(rawName, rawUrl) {
  let url = rawUrl;
  if (!rawUrl) {
    url = window.location.href;
  }
  const name = rawName.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function validateEmail(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function hashPassword(password, salt, verifyCode) {
  return String(
    SHA256(String(SHA256(String(SHA1(password + salt)))) + verifyCode),
  );
}

export function getRandomKey(size) {
  return Math.random()
    .toString(36)
    .slice(size);
}

export function getKeyHash(url, body, randomKey, timeStamp) {
  let newURL = url.replace(/:(\d{1,9})/, '');
  let token = `${newURL}${body}${randomKey}${timeStamp}`;
  let hash = CryptoJS.HmacSHA256(token, CONFIG.SERVER_KEY);
  let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
}

/************Format Date************/
export function getDate(offset = 0) {
  return moment()
    .add(offset, 'days')
    .toDate();
}

export function parseDate(date) {
  return moment(date, COMMON_CONST.FormatDateServer).toDate();
}

export function parseDateTime(date) {
  return moment(date, COMMON_CONST.FormatDateTimeServer).toDate();
}

export function formatDateServer(date) {
  return moment(date).format(COMMON_CONST.FormatDateServer);
}

export function formatDateTimeServer(date) {
  return moment(date).format(COMMON_CONST.FormatDateTimeServer);
}

export function formatDate(date) {
  return moment(date).format(COMMON_CONST.FormatDate);
}

export function formatDateTime(date) {
  return moment(date).format(COMMON_CONST.FormatDateTime);
}

export function checkRangeDate(fromDate, toDate) {
  if (moment(fromDate).isSame(toDate, 'day')) {
    if (moment(getDate(0)).isSame(fromDate, 'day')) {
      return 'Hôm nay';
    } else if (moment(getDate(-1)).isSame(fromDate, 'day')) {
      return 'Hôm qua';
    } else {
      return formatDate(fromDate);
    }
  } else {
    return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
  }
}

// export function getIdsPaging(itemIds, activePage, pageSize) {
//   const pageIndex = activePage - 1;
//   return !isEmpty(itemIds)
//     ? itemIds.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
//     : [];
// }

// export function getIdsPagingMaps(itemList, activePage, pageSize) {
//   const itemIds = !isEmpty(itemList) ? Array.from(itemList.keys()) : [];
//   return getIdsPaging(itemIds, activePage, pageSize);
// }

// export function decodeUtf8(arrayBuffer) {
//   return new TextDecoder('utf-8').decode(arrayBuffer);
// }

/************Format Number************/
export function parseToInt(value) {
  return parseInt(value, 10);
}

export function formatCurrency(
  value,
  unit = '',
  locale = CONFIG.VER,
  digit = 0,
) {
  const v = parseFloat(value).toLocaleString(locale, {
    minimumFractionDigits: digit,
  });
  return unit ? `${v}${unit}` : `${v}`;
}

export function formatNumberShort(num, digits) {
  if (!digits) {
    digits = 1;
  }
  var si = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'K'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

export function numberToArray(count, start = 1) {
  return [...Array(count - start).keys()].map(item => item + start);
}

export function formatNumber(input) {
  return input
    .toString()
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/************Format Date************/
export function getTotalSize(listData) {
  return listData && listData != null ? listData[0].TotalRows : 0;
}

/************View data************/
export function renderIf(condition, content) {
  if (condition) {
    return content;
  } else {
    return null;
  }
}

/************Location************/
export function getLocationDevice() {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentSpeed = JSON.stringify(position.coords.speed);
        const reqModel = {
          Lat: currentLatitude,
          Lng: currentLongitude,
          Speed: currentSpeed,
        };
        resolve({isSuccess: true, result: reqModel});
      },
      error => {
        console.log(error.message);
        if (
          error.code === 3 ||
          error.message === 'Location request timed out'
        ) {
          resolve({isSuccess: true, result: null});
        } else {
          resolve({isSuccess: false, result: null});
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        //maximumAge: 1000,
      },
    );
  });
}

export function getAddressFromLocation(lat, lng) {
  return new Promise(resolve => {
    Geocoder.from(lat, lng)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        resolve(addressComponent);
      })
      .catch(error => console.warn(error));
  });
}

/************Permission************/
export async function getPermission(permission) {
  const permissionName = findEnumById(EnumPermission, permission).label;
  const title = `Chúng tôi cần bạn cho phép truy cập ${permissionName}`;
  const message = `Chúng tôi không thể vận hành khi chưa được cấp phép sử dụng ${permissionName} của bạn. Một vài thao tác nhỏ nữa thôi là chúng ta đã hợp tác được với nhau rồi`;
  try {
    switch (permission) {
      case EnumPermission.ACCESS_FINE_LOCATION.id:
        const grantedLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title,
            message,
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          },
        );
        if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      case EnumPermission.CAMERA.id:
        const grantedCamera = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title,
            message,
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          },
        );
        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
}

/************Image************/
export function takePicture() {
  return new Promise(resolve => {
    const options = {
      title: 'Chọn ảnh',
      cancelButtonTitle: 'Hủy',
      takePhotoButtonTitle: 'Chụp ảnh mới',
      chooseFromLibraryButtonTitle: 'Lấy ảnh trong thư viện ảnh',
      mediaType: 'photo',
      quality: 0.5,
      permissionDenied: {
        title: 'Yêu cầu quyền truy cập',
        text: 'Yêu cầu hệ thống trao quyền truy cập máy ảnh',
      },
      // customButtons: [{name: 'fb', title: 'Chọn ảnh từ facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Có lỗi xảy ra', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        resolve(response);
      }
    });
  });
}

export function capturePicture() {
  return new Promise(resolve => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      permissionDenied: {
        title: 'Yêu cầu quyền truy cập',
        text: 'Yêu cầu hệ thống trao quyền truy cập máy ảnh',
      },
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Có lỗi xảy ra', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        resolve(response);
      }
    });
  });
}

export function readImageUrl(imageUrl) {
  return `${CONFIG.CDN_URL}/${imageUrl}`;
}

export function convertImageUriToBase64(uri) {
  return new Promise(resolve => {
    ImgToBase64.getBase64String(uri)
      .then(base64String => {
        resolve({
          isSuccess: true,
          data: `data:image/jpeg;base64,${base64String}`,
        });
      })
      .catch(err => {
        resolve({
          isSuccess: false,
          data: err,
        });
      });
  });
}

export function resizeImage(uri, wh = 1200, quality = 100) {
  return new Promise(resolve => {
    ImageResizer.createResizedImage(uri, wh, wh, 'JPEG', quality)
      .then(resResize => {
        convertImageUriToBase64(resResize.uri).then(resBase => {
          resolve(resBase);
        });
      })
      .catch(err => {
        resolve({
          isSuccess: false,
          data: err,
        });
      });
  });
}
