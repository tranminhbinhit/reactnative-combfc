import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  dialogStyle: {bottom: 0, position: 'absolute'},
});

class ControlPopup extends React.Component {
  render() {
    const heighDefault = deviceHeight - 100;
    const {
      title,
      height = heighDefault,
      children,
      onTouchOutside,
      ...rest
    } = this.props;
    return (
      <Dialog
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        dialogTitle={<DialogTitle title={title} />}
        onTouchOutside={onTouchOutside}
        width={1}
        height={height}
        dialogStyle={styles.dialogStyle}
        {...rest}>
        <DialogContent style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              position: 'absolute',
              top: -40,
              left: 15,
              zIndex: 2
            }}>
            <TouchableOpacity onPress={onTouchOutside}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/close-icon.png')}
              />
            </TouchableOpacity>
          </View>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}

export default ControlPopup;
