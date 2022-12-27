import React from 'react';
import {View, ScrollView} from 'react-native';

import LoadingOverLay from '../../components/Loading/LoadingOverLay';

const ViewWrapper = ({
  style,
  renderTop,
  renderButton,
  children,
  onScroll,
  isVisible = false,
}) => (
  <View style={style}>
    <LoadingOverLay isVisible={isVisible} />
    {renderTop}
    <View>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll}>
        {children}
      </ScrollView>
    </View>
    {renderButton}
  </View>
);

export default ViewWrapper;
