import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
import * as colors from '../../constants/colors';

/*
  EX:
  <DataDropdownSelect
    options={listGender}
    title="Giới tính"
    data={gender}
    onSelect={data => {
      this.setState({gender: data});
    }}
  />
*/

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 15,
  },
  itemOption: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  itemOptionClick: {
    height: 40,
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  dialogTitle: {
    padding: 10,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  dialogStyle: {top: 50, position: 'absolute'},
});

class ControlDropdownSelect extends React.Component {
  state = {
    isShow: false,
  };

  showPopup = isShow => {
    this.setState({
      isShow,
    });
  };

  render() {
    const {data, options, onSelect, title, height = 300} = this.props;
    const {isShow} = this.state;
    return (
      <View style={styles.itemContainer}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={() => {
              this.showPopup(true);
            }}>
            <Text style={styles.dialogTitle}>{data.label}</Text>
            <Text style={{position: 'absolute', right: 10, top: 7}}>
              {'\u2304'}
            </Text>
          </TouchableOpacity>
        </View>
        <Dialog
          visible={isShow}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          dialogTitle={<DialogTitle title={title} />}
          onTouchOutside={() => this.showPopup(false)}
          width={0.8}
          height={height}
          dialogStyle={styles.dialogStyle}>
          <DialogContent>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((item, index) => (
                <View style={styles.itemOption} key={`item_${index}`}>
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                      this.showPopup(false);
                    }}>
                    <Text
                      style={[
                        item.value === data.value ? {color: colors.main} : {},
                        styles.itemOptionClick,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

export default ControlDropdownSelect;
