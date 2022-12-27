import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  loading: {
    height: this.props.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isVisible) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.pink} />
        </View>
      );
    }
    return null;
  }
}
