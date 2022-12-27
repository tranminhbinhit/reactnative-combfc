import React from 'react';

import {View, StyleSheet, ActivityIndicator} from 'react-native';

import * as colors from '../../constants/colors';

export default class LoadMore extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isVisible) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.pink} />
        </View>
      );
    }
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
