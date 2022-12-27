import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlButton: {
    padding: 0,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.efefef,
  },
});

const AddEditWrapper = ({style, renderTop, renderButton, children}) => (
  <View style={[{flex: 1}, style]}>
    {renderTop}
    <View style={{padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
    <View style={styles.controlButton}>{renderButton}</View>
  </View>
);

export default AddEditWrapper;
