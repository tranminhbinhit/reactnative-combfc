import {StyleSheet} from 'react-native';

import * as colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
  },
  buttonBottom: {
    margin: 10,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 15,

    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
  },
});
