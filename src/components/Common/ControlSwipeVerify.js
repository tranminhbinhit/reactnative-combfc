import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';
import RNSwipeVerify from 'react-native-swipe-verify';

class ControlSwipeVerify extends React.Component {
  static defaultProps = {
    style: {},
    returnKeyType: 'next',
  };

  render() {
    const {
      isUnlocked,
      onVerified,
      processText = 'Trượt xác nhận',
      processDone = 'Hoàn thành',
      ...rest
    } = this.props;
    return (
      <RNSwipeVerify
        ref={ref => (this.swipeVerify = ref)}
        buttonSize={60}
        // borderColor={colors.ddd}
        buttonColor={colors.ddd}
        backgroundColor={colors.ededed}
        textColor={colors.dark}
        okButton={{visible: false, duration: 1000}}
        borderRadius={30}
        onVerified={onVerified}
        icon={
          <Image
            source={
              isUnlocked
                ? require('../../assets/success.png')
                : require('../../assets/arrow-right.png')
            }
            style={{width: 40, height: 40}}
          />
        }
        {...rest}>
        <Text>{isUnlocked ? processDone : processText}</Text>
      </RNSwipeVerify>
    );
  }
}

export default ControlSwipeVerify;
