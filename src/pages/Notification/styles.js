import {StyleSheet} from 'react-native';

import * as colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  tabText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 22,
    height: 22,
    margin: 11,
  },
  noDataContent: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
