import {StyleSheet} from 'react-native';

import * as colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    flexDirection: 'row',
    backgroundColor: colors.tintColor,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  userName: {
    color: colors.white,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNoBorder: {
    borderBottomWidth: 0,
    borderBottomColor: colors.white,
  },
  infoIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    color: colors.black,
  },
  icon: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  versionContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  versionText: {
    color: colors.pink,
    fontSize: 14,
    paddingVertical: 15,
  },
  headerIcon: {
    width: 22,
    height: 22,
    margin: 11,
  },
  inputView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonHeader: {color: colors.white, fontWeight: 'bold', padding: 10},
  viewContentTop: {
    padding: 10,
    backgroundColor: colors.white,
  },
  viewInput: {
    marginTop: 5,
    backgroundColor: colors.white,
    padding: 10,
  },
  viewScrollSelect: {
    marginBottom: 5,
    height: 40,
    padding: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
