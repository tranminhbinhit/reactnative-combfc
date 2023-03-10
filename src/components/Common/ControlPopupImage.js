import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import stylesGlobal from '../../constants/styles';
import {renderIf} from '../../utils/utils';
import * as colors from '../../constants/colors';
import ViewHeaderModal from './ViewHeaderModal';
import ImageZoom from 'react-native-image-pan-zoom';

class ControlPopupImage extends React.Component {
  state = {
    isShowPopup: false,
  };

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  render() {
    const {title, children, style, source} = this.props;
    const {isShowPopup} = this.state;
    const {height, width} = Dimensions.get('window');
    const widthImg = width - 10;
    const heightImg = height - 135;
    return (
      <View style={style}>
        <TouchableOpacity onPress={() => this.showPopup(true)}>
          {children}
        </TouchableOpacity>
        {renderIf(
          source,
          <Modal
            animationType="slide"
            transparent={true}
            visible={isShowPopup}
            onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
            }}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TouchableOpacity
                onPress={() => {
                  this.showPopup(false);
                }}>
                <View
                  style={{height: 50, backgroundColor: colors.white}}
                  opacity={0.8}
                />
              </TouchableOpacity>
              <ViewHeaderModal showPopup={this.showPopup} title={title} />
              <View style={{flex: 1, backgroundColor: colors.white}}>
                <ImageZoom
                  cropWidth={widthImg}
                  cropHeight={heightImg}
                  imageWidth={widthImg}
                  imageHeight={heightImg}>
                  <Image
                    style={{margin: 5, width: widthImg, height: heightImg}}
                    source={source}
                  />
                </ImageZoom>
              </View>
            </View>
          </Modal>,
        )}
      </View>
    );
  }
}

export default ControlPopupImage;
