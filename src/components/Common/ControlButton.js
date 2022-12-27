import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../../constants/colors';

class ControlButton extends React.Component {
  static defaultProps = {
    style: {},
    returnKeyType: 'next',
  };

  typeButton = () => {
    const {type, size = 0} = this.props;
    let styleData = {
      color: colors.white,
      backgroundColor: colors.info,
      padding: size + 5,
    };
    switch (type) {
      case 'success':
        styleData = {...styleData, backgroundColor: colors.success};
        break;
      case 'warning':
        styleData = {...styleData, backgroundColor: colors.warning};
        break;
      case 'danger':
        styleData = {...styleData, backgroundColor: colors.danger};
        break;
      case 'info':
        styleData = {...styleData, backgroundColor: colors.info};
        break;
      case 'darkgrey':
        styleData = {...styleData, backgroundColor: colors.darkgrey};
        break;
    }
    return styleData;
  };

  render() {
    const {style} = this.props;
    const styleButton = this.typeButton();
    return (
      <View>
        <Text
          style={[
            {
              borderRadius: 5,
              padding: 5,
              textAlign: 'center',
            },
            styleButton,
            style,
          ]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

export default ControlButton;
