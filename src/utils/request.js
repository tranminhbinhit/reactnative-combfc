import {Dimensions, Platform, Alert} from 'react-native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import CONFIG from '../config/config';
import {
  formatDateTimeServer,
  getDate,
  getRandomKey,
  getKeyHash,
} from '../utils/utils';
import {store} from '../redux/store';

const systemName = DeviceInfo.getSystemName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
const uniqueId = DeviceInfo.getUniqueID();
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class request {
  static postAPI = (url, body) => {
    const urlReq = CONFIG.SERVER_URL + url;
    console.log('Request POST:', urlReq, body, {
      headers: request.getHeaders(urlReq),
    });
    return axios
      .post(urlReq, body, {headers: request.getHeaders(urlReq, body)})
      .then(response => {
        console.log('Response POST', response);
        return response ? response.data : null;
      })
      .catch(error => {
        console.log('Response Error', error.message);
        Alert.alert(
          'Response Error',
          error.message + ' Token:' + store.getState().auth.token,
        );
        return null;
      });
  };

  static getAPI = (url, data) => {
    let suffix = '';
    if (data) {
      suffix = `?${Object.keys(data)
        .map(key => [key, data[key]].map(encodeURIComponent).join('='))
        .join('&')}`;
    }
    const urlReq = CONFIG.SERVER_URL + url + suffix;
    console.log('Request GET:', urlReq, {headers: request.getHeaders(urlReq)});
    return axios
      .get(urlReq, {headers: request.getHeaders(urlReq)})
      .then(response => {
        console.log('Response GET:', response);
        return response ? response.data : null;
      })
      .catch(error => {
        Alert.alert(
          'Response Error',
          error.message + ' Token:' + store.getState().auth.token,
        );
        console.log('Response Error', error.message);
        return null;
      });
  };

  static postCDN = dataImage => {
    const urlReq = `${CONFIG.CDN_URL}/upload_base64`;
    const body = {
      base64: dataImage,
      name: 'EnowApp',
      type: '.jpg',
    };

    return axios
      .post(urlReq, body, {headers: {}})
      .then(response => {
        console.log('Response POST', response);
        return response ? response.data : null;
      })
      .catch(error => {
        console.log('Response Error', error.message);
        return null;
      });
  };

  static getToken = () => {
    return store.getState().auth.token;
  };

  static getDeviceToken = () => {
    return store.getState().auth.push_token;
  };

  static getHeaders = (url, body = '') => {
    let timeStamp = formatDateTimeServer(getDate(0));
    let userToken = request.getToken();
    let deviceToken = request.getDeviceToken();
    let randomKey = getRandomKey(-10);
    let hashKey = getKeyHash(url, body, randomKey, timeStamp);
    let enowHeaders = {
      'E-Client-Name': 'EnowApp',
      'Accept-Language': 'vi',
      'Content-Type': 'application/json; charset=utf-8',
      'E-Random-Key': randomKey,
      'E-Device-Token': deviceToken,
      'E-Device-Type': Platform.OS,
      'E-UDID': uniqueId,
      'E-Client-Type': systemName,
      'E-Client-Version': systemVersion,
      'E-Screen-W': deviceWidth,
      'E-Screen-H': deviceHeight,
      'E-App-Version': version,
      'E-Access-Timestamp': timeStamp,
      'E-User-Token': userToken,
      'E-Access-Token': hashKey,
      'E-Log-Request': false,
    };
    return enowHeaders;
  };
}
