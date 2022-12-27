import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {postImageCDN} from '../../setting/action';

import * as colors from '../../constants/colors';
import {
  capturePicture,
  readImageUrl,
  resizeImage,
  renderIf,
} from '../../utils/utils';

class CameraDevice extends React.Component {
  state = {
    avatarUrl: '',
    location: {
      Lat: '',
      Lng: '',
    },
  };

  componentDidMount() {}

  onTakeAPicture = () => {
    const {postImageCDNConnect} = this.props;
    capturePicture().then(response => {
      console.log('Hình lấy được', response);
      if (response) {
        //const source = {uri: 'data:image/jpeg;base64,' + response.data};
        const {latitude, longitude} = response;
        //Resize Image
        resizeImage(response.uri, 800, 100).then(resResize => {
          console.log(resResize);
          if (resResize.isSuccess) {
            this.setState({
              avatarUrl: resResize.data,
              location: {
                Lat: latitude,
                Lng: longitude,
              },
            });

            postImageCDNConnect(resResize.data).then(resData => {
              console.log(
                'Hình Upload',
                resData,
                readImageUrl(resData.FileUrl),
              );
              this.setState({
                avatarUrl: readImageUrl(resData.FileUrl),
              });
            });
          }
        });
      }
    });
  };

  // captureImage = () => {
  //   // Launch Camera:
  //   ImagePicker.launchCamera(options, response => {
  //     console.log('Response = ', response);
  //   });
  // };

  // captureFromLib = () => {
  //   // Open Image Library:
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log('Response = ', response);
  //   });
  // };

  render() {
    const {avatarUrl, location} = this.state;
    return (
      <View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.onTakeAPicture();
            }}>
            <Text
              style={{
                backgroundColor: colors.pink,
                borderRadius: 5,
                padding: 10,
                width: 200,
                marginBottom: 5,
                textAlign: 'center',
                color: colors.white,
              }}>
              Chụp hình trên Device
            </Text>
          </TouchableOpacity>
        </View>
        <Text>
          {location.Lat} - {location.Lng}
        </Text>
        <Image source={{uri: avatarUrl}} style={{height: 500}} />
        <TextInput
          placeholder="URL"
          placeholderTextColor="rgba(0,0,0,0.5)"
          returnKeyType="next"
          autoCapitalize="none"
          defaultValue={avatarUrl}
          autoCorrect={false}
          underlineColorAndroid="transparent"
        />
        {renderIf(
          avatarUrl.length > 0,
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(avatarUrl);
            }}>
            <Text
              style={{
                backgroundColor: colors.pink,
                borderRadius: 5,
                padding: 10,
                width: 200,
                marginBottom: 5,
                textAlign: 'center',
                color: colors.white,
              }}>
              Xem hình
            </Text>
          </TouchableOpacity>,
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isReady: state.setting.isReady,
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({
  postImageCDNConnect: dataImage => {
    return dispatch(postImageCDN(dataImage));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraDevice);
