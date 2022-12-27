import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import * as colors from '../../constants/colors';

const ViewHeaderModal = ({title, showPopup, style}) => (
  <View
    style={[
      {
        padding: 12,
        borderColor: colors.ddd,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: colors.white,
      },
      style,
    ]}>
    <TouchableOpacity
      style={{
        padding: 5,
        margin: 5,
        width: 40,
        height: 40,
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onPress={() => {
        showPopup(false);
      }}>
      <Image
        style={{width: 30, height: 30}}
        source={require('../../assets/close-icon.png')}
      />
    </TouchableOpacity>
    <Text style={{fontSize: 18, textAlign: 'center'}}>{title}</Text>
  </View>
);

export default ViewHeaderModal;
