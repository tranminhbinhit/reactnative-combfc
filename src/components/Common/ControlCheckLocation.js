import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import * as colors from '../../constants/colors';
import ControlButton from '../../components/Common/ControlButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ControlInput from './ControlInput';
import {getAddressFromLocation, getLocationDevice} from '../../utils/utils';

const initState = {
  isShowPopup: false,
  region: {
    latitude: 10.823099,
    longitude: 106.629662,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  address: '',
  isChangeAddress: false,
  flex: 1,
};

class ControlCheckLocation extends React.Component {
  state = initState;

  componentDidMount() {
    const {region} = this.props;
    let {lat = 0, lng = 0, address} = region;
    if (lat === 0 || lng === 0) {
      getLocationDevice().then(resLocation => {
        const {Lat, Lng} = resLocation.result;
        getAddressFromLocation(Lat, Lng).then(resAddress => {
          console.log(resAddress);
          this.setState(prevState => ({
            region: {
              ...prevState.region,
              latitude: parseFloat(Lat),
              longitude: parseFloat(Lng),
            },
            address: resAddress,
          }));
        });
      });
    } else {
      this.setState(prevState => ({
        region: {
          ...prevState.region,
          latitude: lat,
          longitude: lng,
        },
        address,
      }));
    }
  }

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  onRegionChangeComplete = region => {
    this.setState({region, isChangeAddress: false});
    getAddressFromLocation(region.latitude, region.longitude).then(
      resAddress => {
        this.setState({address: resAddress});
      },
    );
  };

  onDragEndChangePosition = region => {
    this.setState({region});
  };

  onSaveData = () => {
    const {onChange} = this.props;
    const {address, region} = this.state;
    onChange({
      lat: region.latitude,
      lng: region.longitude,
      address,
    });
    this.showPopup(false);
  };

  render() {
    const {isShowPopup, address} = this.state;
    const {children, style} = this.props;
    return (
      <View style={style}>
        <TouchableOpacity
          onPress={() => {
            this.showPopup(true);
          }}>
          {children}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowPopup}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            this.showPopup(false);
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.ddd,
              }}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  marginLeft: 10,
                  margin: 10,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 35,
                  height: 35,
                  zIndex: 2,
                }}
                onPress={() => {
                  this.showPopup(false);
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../assets/close-icon.png')}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                Chọn vị trí
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  marginTop: -35,
                  marginLeft: -12,
                  left: '50%',
                  top: '50%',
                  width: 25,
                  height: 35,
                }}
                source={require('../../assets/latlng-icon.png')}
              />
              <MapView
                style={{
                  flex: 1,
                }}
                region={this.state.region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                // onRegionChange={region =>
                //   this.setState({isChangeAddress: true})
                // }
                onRegionChangeComplete={this.onRegionChangeComplete}>
                {/* <MapView.Marker
                  coordinate={this.state.region}
                  image={require('../../assets/latlng-icon.png')}
                  style={{width: 25, height: 35}}
                /> */}
              </MapView>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: colors.white,
              }}>
              <ControlInput
                style={{margin: 10}}
                placeholder="Địa chỉ"
                defaultValue={address}
                refProp={input => (this.titleInput = input)}
                onSubmitEditing={() => this.contentInput.focus()}
                onChange={event => {
                  this.setState({address: event.nativeEvent.text});
                }}
              />
              <TouchableOpacity onPress={() => this.onSaveData()}>
                <ControlButton
                  type="success"
                  style={{
                    margin: 10,
                    padding: 15,
                    borderRadius: 5,
                    marginBottom: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Chọn
                </ControlButton>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default ControlCheckLocation;
