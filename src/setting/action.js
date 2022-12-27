import {Alert} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import actions from '../constants/actionType';
import request from '../utils/request';
import {isSuccess, parseToInt} from '../utils/utils';
import {store} from '../redux/store';
import {
  startServicePosition,
  stopServicePosition,
} from '../utils/utilsLocation';
import {
  getLocationDevice,
  getDate,
  formatDateServer,
  formatDateTimeServer,
} from '../utils/utils';
//import {startServicePosition, stopServicePosition} from '../utils/utilsLocation';
import {getDistance} from '../utils/MapsUtils';
import CONFIG from '../config/config';

let timeCall = CONFIG.TIME_INTERVAL_DEFAULT;
let isStartTrackingService = true;

export function finishInitApp() {
  return {
    type: actions.FINISH_INIT_APP,
  };
}

export function startAppLoading() {
  return {
    type: actions.START_APP_LOADING,
  };
}

export function stopAppLoading() {
  return {
    type: actions.STOP_APP_LOADING,
  };
}

export function setGeneralError(message) {
  Alert.alert('Thông báo', message || 'Hệ thống quá tải');
}

export function getMetaData() {
  return dispatch => {
    dispatch(startAppLoading());
    return request.getAPI('/app/metadata/get').then(response => {
      if (isSuccess(response)) {
        dispatch({
          type: actions.GET_META_DATA,
          response: {
            metadata: response.result,
          },
        });
      } else {
        setGeneralError();
      }
      return dispatch(stopAppLoading());
    });
  };
}

export function getSetting() {
  return dispatch => {
    dispatch(startAppLoading());
    return request.getAPI('/app/setting/get', {}).then(response => {
      if (isSuccess(response)) {
        const returnValue = response.result.reduce(function(map, obj) {
          let valueObj = obj.SettingValue;
          if (obj.SettingType === 'boolen') {
            valueObj = obj.SettingValue === 'true' ? true : false;
          }

          if (obj.SettingType === 'number') {
            valueObj = parseToInt(obj.SettingValue);
          }

          map[obj.SettingCode] = {
            SettingName: obj.SettingName,
            SettingValue: valueObj,
          };
          return map;
        }, {});

        dispatch({
          type: actions.GET_SETTING_APP,
          response: {
            settingApp: returnValue,
          },
        });
      } else {
        dispatch(setGeneralError());
      }
      return dispatch(stopAppLoading());
    });
  };
}

export function initializeApp() {
  return dispatch =>
    dispatch(getMetaData()).then(() =>
      Promise.all([dispatch(getSetting())]).then(() => {
        dispatch(finishInitApp());
      }),
    );
}

export function pingLocationUser() {
  return dispatch => {
    //Run service background location
    startServicePosition();
    BackgroundTimer.runBackgroundTimer(() => {
      const {auth} = store.getState();
      const {isLoginSuccess} = auth;
      if (isLoginSuccess) {
        // Kiểm tra nếu service device ko alow thì không chạy
        if (!isStartTrackingService) {
          return;
        }
        getLocationDevice().then(res => {
          isStartTrackingService = true;
          if (res.isSuccess) {
            if (res.result !== null) {
              timeCall = CONFIG.TIME_INTERVAL_DEFAULT;
              const reqData = res.result;
              const {setting} = store.getState();
              const {lastLocation, settingApp} = setting;
              //console.log('lastLocation', lastLocation);
              if (lastLocation.Lat != null) {
                const fromLocation = {
                  lat: lastLocation.Lat,
                  lng: lastLocation.Lng,
                };
                const toLocation = {
                  lat: reqData.Lat,
                  lng: reqData.Lng,
                };
                const currentDate = formatDateServer(getDate(0));
                var distance = getDistance(fromLocation, toLocation);
                dispatch(updateLastLocationTime(reqData, distance));
                // console.log(
                //   'Check update',
                //   distance,
                //   lastLocation.CreatedDate,
                //   currentDate,
                // );
                // 5m log 1 lần
                let distanceConfig =
                  settingApp.ENOW_ORDER_TRACKING_DISTANCE.SettingValue;
                distanceConfig = distanceConfig ? distanceConfig / 1000 : 0.01;
                if (
                  distance > distanceConfig ||
                  lastLocation.CreatedDate !== currentDate
                ) {
                  dispatch(setLocationTracking(reqData));
                }
              } else {
                dispatch(setLocationTracking(reqData));
              }
              dispatch(updateLocationUser());
            } else {
              timeCall = CONFIG.TIME_INTERVAL_TIMEOUT;
            }
          }
        });
        isStartTrackingService = false;
      } else {
        BackgroundTimer.stopBackgroundTimer();
        //Stop service background location
        stopServicePosition();
      }
    }, timeCall);
  };
}

//Push location lên server
export function updateLocationUser() {
  return dispatch => {
    const {setting} = store.getState();
    const {listLocationTracking} = setting;
    if (listLocationTracking && listLocationTracking.length > 0) {
      const reqModel = {
        ListLocations: listLocationTracking.map(m => {
          return {...m, CreatedDate: m.CreatedDateTime};
        }),
      };
      return request
        .postAPI('/app/tracking/create', reqModel)
        .then(response => {
          if (isSuccess(response)) {
            dispatch({
              type: actions.SET_LOCATION_TRACKING_DONE,
              response: {
                listLocationTracking,
              },
            });
            return true;
          }
          return false;
        });
    } else {
      return false;
    }
  };
}

//Cập nhật vị trí cuối cùng lên store
export function updateLastLocationTime(reqData, distance) {
  return dispatch => {
    dispatch({
      type: actions.SET_LAST_LOCATION_TIME,
      response: {
        Time: formatDateTimeServer(getDate(0)),
        Speed: reqData.Speed,
        Distance: distance,
      },
    });
  };
}

//Cập nhật vị trí location push store => push server
export function setLocationTracking(reqData) {
  const reqLocation = {
    ...reqData,
    CreatedDateTime: formatDateTimeServer(getDate(0)),
  };
  return dispatch => {
    dispatch({
      type: actions.SET_LOCATION_TRACKING,
      response: {
        LocationTracking: reqLocation,
      },
    });
  };
}

//Push location lên server
export function postImageCDN(dataImage) {
  return dispatch => {
    dispatch(startAppLoading());
    return request.postCDN(dataImage).then(response => {
      dispatch(stopAppLoading());
      return response;
    });
  };
}
