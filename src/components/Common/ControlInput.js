import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';

/*
  EX:
  <ControlInput
    placeholder="Năm sinh"
    defaultValue={yearOfBird}
    returnKeyType="go"
    refProp={input => (this.yearOfBirdInput = input)}
    onChange={event => {
      this.setState({yearOfBird: event.nativeEvent.text});
    }}
    keyboardType={'numeric'}
  />
  //keyboardType ["default","email-address","numeric","phone-pad","number-pad","ascii-capable","numbers-and-punctuation","url","name-phone-pad","decimal-pad","twitter","web-search","visible-password"]
*/

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

class ControlInput extends React.Component {
  static defaultProps = {
    style: {},
    returnKeyType: 'next',
  };

  render() {
    const {style, returnKeyType, refProp, ...rest} = this.props;
    return (
      <TextInput
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={[styles.input, style]}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType={returnKeyType}
        ref={refProp}
        editable
        {...rest}
      />
    );
  }
}

export default ControlInput;
