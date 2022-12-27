import React from 'react';
import {StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';
import TextInputMask from 'react-native-text-input-mask';

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
});

class ControlInputMask extends React.Component {
  static defaultProps = {
    style: {},
    returnKeyType: 'next',
  };

  render() {
    const {
      style,
      returnKeyType,
      refProp,
      onChange,
      mask = '[000] [000] [000] [000] [000]',
      ...rest
    } = this.props;
    return (
      <TextInputMask
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={[styles.input, style]}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType={returnKeyType}
        ref={refProp}
        onChangeText={(formatted, extracted) => {
          //console.log(formatted); // +1 (123) 456-78-90
          onChange(extracted); // 1234567890
        }}
        mask={mask}
        {...rest}
      />
    );
  }
}

export default ControlInputMask;
