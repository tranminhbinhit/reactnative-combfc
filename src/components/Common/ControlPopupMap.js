import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  TouchableHighlight,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import stylesGlobal from '../../constants/styles';
import {renderIf} from '../../utils/utils';
import * as colors from '../../constants/colors';
import ViewHeaderModal from './ViewHeaderModal';

class ControlPopupMap extends React.Component {
  state = {
    isShowPopup: false,
  };

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  render() {
    const {title, children, style} = this.props;
    let {region = {}} = this.props;
    const isHaveLocation = region.lat && region.lng;
    let regionMap = null;
    if (isHaveLocation) {
      regionMap = {
        latitude: region.lat,
        longitude: region.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    const {isShowPopup} = this.state;
    return (
      <View style={style}>
        <TouchableOpacity onPress={() => this.showPopup(true)}>
          {children}
        </TouchableOpacity>
        {renderIf(
          isHaveLocation,
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
                  style={{height: 100, backgroundColor: colors.white}}
                  opacity={0.8}
                />
              </TouchableOpacity>
              <ViewHeaderModal showPopup={this.showPopup} title={title} />
              <View style={{flex: 1, backgroundColor: colors.white}}>
                <View style={{flex: 1}}>
                  <MapView
                    style={{
                      flex: 1,
                    }}
                    region={regionMap}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}>
                    <Marker draggable={false} coordinate={regionMap}>
                      <MapView.Callout
                        tooltip
                        style={{backgroundColor: colors.white, padding: 10}}>
                        <TouchableHighlight
                          //onPress={() => this.markerClick()}
                          underlayColor="#dddddd">
                          <View style={{flexDirection: 'column'}}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}>
                              Địa chỉ
                            </Text>
                            <Text style={{color: colors.darkgrey}}>
                              {region.address}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </MapView.Callout>
                    </Marker>
                  </MapView>
                </View>
                {renderIf(
                  region.address,
                  <View style={stylesGlobal.buttonBottomView}>
                    <View style={{padding: 15}}>
                      <Text>{region.address}</Text>
                    </View>
                  </View>,
                )}
              </View>
            </View>
          </Modal>,
        )}
      </View>
    );
  }
}

export default ControlPopupMap;
