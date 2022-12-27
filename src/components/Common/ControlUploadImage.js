import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import * as colors from '../../constants/colors';
import {capturePicture, resizeImage, renderIf} from '../../utils/utils';
/*
  EX:
    <ControlUploadImage
        images={images}
        onChangeData={listImage => {
        this.setState({images: listImage});
        }}
        maxImage={1} // Số hình tối đa
        isShowAddMax={false} // Hiển thị nút thêm hình khi ở max
        wh={1200},
        quality={100}
    />

*/

const styles = StyleSheet.create({
  imagewarper: {
    borderColor: colors.gray,
    borderWidth: 1,
    padding: 5,
    width: 112,
    marginRight: 5,
  },
});

class ControlUploadImage extends React.Component {
  static defaultProps = {
    style: {},
    returnKeyType: 'next',
    isShowAddMax: true,
    wh: 1200,
    quality: 100,
  };

  onTakeAPicture = () => {
    const {onChangeData, maxImage, wh, quality} = this.props;
    let {images = []} = this.props;
    capturePicture().then(response => {
      if (response) {
        resizeImage(response.uri, wh, quality).then(resResize => {
          if (resResize.isSuccess) {
            images = [
              {
                imageData: resResize.data,
                imageUrl: resResize.data,
                data: response,
                isAdd: true,
                id: Date.now(),
              },
              ...images,
            ];
            images = images.slice(0, maxImage);
            onChangeData(images);
          }
        });
      }
    });
  };

  onRemoveImage = item => {
    const {onChangeData} = this.props;
    let {images = []} = this.props;
    images = images.filter(m => m.id !== item.id);
    onChangeData(images);
  };

  render() {
    const {style, images, isShowAddMax, maxImage} = this.props;
    const isShowAdd = isShowAddMax || images.length < maxImage;
    return (
      <View style={[{marginBottom: 15, flexDirection: 'row'}, style]}>
        {renderIf(
          isShowAdd,
          <View style={styles.imagewarper}>
            <TouchableOpacity
              onPress={() => {
                this.onTakeAPicture();
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/camera.png')}
              />
            </TouchableOpacity>
          </View>,
        )}
        {images.map((item, index) => (
          <View key={`imageAdd${index}`} style={styles.imagewarper}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: item.imageUrl}}
            />

            <TouchableOpacity
              style={{position: 'absolute', top: 5, right: 5}}
              onPress={() => {
                this.onRemoveImage(item);
              }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={require('../../assets/remove-icon.png')}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

export default ControlUploadImage;
