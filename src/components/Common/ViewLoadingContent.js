import React from 'react';
import {View} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {renderIf} from '../../utils/utils';

const ViewLoadingContent = ({isLoading, style, children, ...rest}) => (
  <View style={style}>
    {renderIf(!isLoading, children)}
    {renderIf(
      isLoading,
      <ContentLoader speed={1}>
        <Rect rx="4" ry="4" {...rest} />
      </ContentLoader>,
    )}
  </View>
);

export default ViewLoadingContent;
