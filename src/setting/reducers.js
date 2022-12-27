import actions from '../constants/actionType';
import {formatDateServer, formatDateTimeServer, getDate} from '../utils/utils';

const initialState = {
  isReady: false,
  metadata: {},
  settingApp: {},
  lastLocation: {
    Lat: 0,
    Lng: 0,
    CreatedDate: '',
    CreatedDateTime: '',
    CreatedDateTimeDone: '',
    Speed: 0,
    Distance: 0,
  },
  listLocationTracking: [],
};

export default function settingReducer(state = initialState, action) {
  const {response, type} = action;
  switch (type) {
    case actions.FINISH_INIT_APP:
      return {
        ...state,
        isReady: true,
      };
    case actions.GET_META_DATA:
      const {metadata} = response;
      return {
        ...state,
        metadata,
      };
    case actions.GET_SETTING_APP:
      const {settingApp} = response;
      return {
        ...state,
        settingApp,
      };
    case actions.SET_LAST_LOCATION_TIME:
      const {Time, Speed, Distance} = response;
      return {
        ...state,
        lastLocation: {
          ...state.lastLocation,
          CreatedDateTime: Time,
          Speed,
          Distance,
        },
      };
    case actions.SET_LOCATION_TRACKING:
      const {LocationTracking} = response;
      if (!state.listLocationTracking) {
        state.listLocationTracking = [];
      }
      return {
        ...state,
        listLocationTracking: [...state.listLocationTracking, LocationTracking],
        lastLocation: {
          ...state.lastLocation,
          Lat: LocationTracking.Lat,
          Lng: LocationTracking.Lng,
          CreatedDate: formatDateServer(LocationTracking.CreatedDateTime),
          CreatedDateTime: LocationTracking.CreatedDateTime,
        },
      };
    case actions.SET_LOCATION_TRACKING_DONE:
      const {listLocationTracking: listLocationTrackingDone} = response;
      return {
        ...state,
        lastLocation: {
          ...state.lastLocation,
          CreatedDateTimeDone: formatDateTimeServer(getDate(0)),
        },
        listLocationTracking: state.listLocationTracking.filter(
          m =>
            !listLocationTrackingDone.find(
              k => k.CreatedDate === m.CreatedDate,
            ),
        ),
      };
    default:
      return state;
  }
}
