import React from 'react';
import {View, Text} from 'react-native';

import * as colors from '../../constants/colors';
import {renderIf} from '../../utils/utils';

const FormControlWrapper = ({title, isRequired = false, children, style}) => (
  <View style={([{flexDirection: 'column'}], style)}>
    <View style={{justifyContent: 'center'}}>
      <Text style={{fontSize: 13, marginBottom: 4, color: colors.dark}}>
        {title}
        {renderIf(isRequired, <Text style={{color: colors.danger}}>*</Text>)}
      </Text>
    </View>
    <View>{children}</View>
  </View>
);

export default FormControlWrapper;
