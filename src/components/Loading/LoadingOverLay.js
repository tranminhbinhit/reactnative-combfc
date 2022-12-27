import React from 'react';

import {View, StyleSheet, ActivityIndicator} from 'react-native';

import * as colors from '../../constants/colors';

export default class LoadingOverLay extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isVisible) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.facebook} />
        </View>
      );
    }
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgrey,
    opacity: 0.7,
    zIndex: 9999,
  },
});
