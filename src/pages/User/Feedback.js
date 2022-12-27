import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
//import GoogleStracker from '../../services/google-analytic-stracker';

import styles from './styles';
import * as colors from '../../constants/colors';
import LoadingOverlay from '../../components/Loading/LoadingOverLay';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

export default class Feedback extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Góp ý',
      headerRight: (
        <TouchableOpacity onPress={params.sendFeedback}>
          <Text style={styles.buttonHeader}>Gửi</Text>
        </TouchableOpacity>
      ),
    };
  };

  state = {
    isLoading: true,
    isSubmit: false,
    data: {
      FeedbackTypes: [{Name: 'Một', Value: '1'}, {Name: 'Một', Value: '1'}],
      FromWheres: [{Name: 'Một', Value: '1'}, {Name: 'Một', Value: '1'}],
    },
    fromWhere: '---',
    feedbackType: '---',

    title: '',
    content: '',
    email: '',
  };
  componentDidMount() {
    //GoogleStracker.trackScreenView('Góp ý');
    this.props.navigation.setParams({
      sendFeedback: this.sendFeedback.bind(this),
    });
    this.getInfo();
  }
  sendFeedback = () => {
    const {title, content, email} = this.props;
    if (!this.state.isSubmit) {
      if (title === '') {
        Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề');
        this.titleInput.focus();
      } else if (content === '') {
        Alert.alert('Thông báo', 'Vui lòng nhập nội dung góp ý');
        this.contentInput.focus();
      } else if (email === '') {
        Alert.alert('Thông báo', 'Vui lòng nhập email của bạn.');
        this.emailInput.focus();
      } else {
        this.setState(
          {
            isSubmit: true,
          },
          () => {
            let data = {
              Title: title,
              Content: content,
              Email: email,
              FeedbackType: this.state.feedbackType,
              FromWhere: this.state.fromWhere,
            };
            // API.saveFeadback(data).then(result => {
            //   if (typeof result === 'string') {
            //     this.setState(
            //       {
            //         isSubmit: false,
            //       },
            //       () => {
            //         Alert.alert('Thông báo', result);
            //       },
            //     );
            //   } else {
            //     if (result.status === 200) {
            //       title = content = email = '';
            //       this.setState(
            //         {
            //           isSubmit: false,
            //         },
            //         () => {
            //           Alert.alert(
            //             'Thông báo',
            //             'Gửi góp ý thành công, cảm ơn bạn đã góp ý về Enow.',
            //           );
            //         },
            //       );
            //     } else {
            //       this.setState(
            //         {
            //           isSubmit: false,
            //         },
            //         () => {
            //           let message = result.data
            //             ? result.data
            //             : result._response;
            //           Alert.alert('Thông báo', message);
            //         },
            //       );
            //     }
            //   }
            // });
          },
        );
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng chờ quá trình hoàn tất.');
    }
  };

  getInfo = () => {
    // API.getInfoFeedback().then(result => {
    //   if (typeof result === 'string') {
    //     this.setState(
    //       {
    //         isLoading: false,
    //       },
    //       () => {
    //         Alert.alert('Thông báo', result);
    //       },
    //     );
    //   } else {
    //     if (result.status === 200) {
    //       this.setState({
    //         data: result.data,
    //         isLoading: false,
    //         feedbackType:
    //           result.data.FeedbackTypes.length > 0
    //             ? result.data.FeedbackTypes[0]
    //             : '---',
    //         fromWhere:
    //           result.data.FromWheres.length > 0
    //             ? result.data.FromWheres[0]
    //             : '---',
    //       });
    //     } else {
    //       this.setState(
    //         {
    //           isLoading: false,
    //         },
    //         () => {
    //           let message = result.data ? result.data : result._response;
    //           Alert.alert('Thông báo', message);
    //         },
    //       );
    //     }
    //   }
    // });
  };
  render() {
    let {title, email, content} = this.state;
    return (
      <View style={styles.container}>
        <LoadingOverlay isVisible={this.state.isSubmit} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewContentTop}>
            <Text>
              Enow vui lòng tiếp nhận mọi góp ý từ phía khách hàng. Chúng tôi
              tin rằng những góp ý tích cực của bạn sẽ là hành trang giúp chúng
              tôi phát triển hơn trong tương lai
            </Text>
          </View>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Tiêu đề góp ý"
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={styles.input}
              returnKeyType="next"
              autoCapitalize="none"
              defaultValue={title}
              onChange={event => {
                title = event.nativeEvent.text;
              }}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.titleInput = input)}
              onSubmitEditing={() => this.contentInput.focus()}
            />
            <TextInput
              multiline
              placeholder="Nội dung góp ý"
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={[styles.input, {height: 100}]}
              returnKeyType="next"
              autoCapitalize="none"
              defaultValue={content}
              onChange={event => {
                content = event.nativeEvent.text;
              }}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.contentInput = input)}
              onSubmitEditing={() => this.emailInput.focus()}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={styles.input}
              returnKeyType="go"
              autoCapitalize="none"
              defaultValue={email}
              onChange={event => {
                email = event.nativeEvent.text;
              }}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.emailInput = input)}
            />
            <View style={styles.inputView}>
              <Text style={styles.container}>Góp ý về : </Text>
              <TouchableOpacity
                onPress={() => {
                  this.typeDialog.show();
                }}>
                <Text>{this.state.feedbackType}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.container}>Bạn biết đến Enow từ?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.fromDialog.show();
                }}>
                <Text>{this.state.fromWhere}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="Góp ý về"
              titleStyle={{backgroundColor: colors.gray}}
            />
          }
          width={0.8}
          height={265}
          dialogAnimation={slideAnimation}
          ref={popupDialog => {
            this.typeDialog = popupDialog;
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.data.FeedbackTypes.map((item, index) => (
              <View style={styles.viewScrollSelect} key={`city_${index}`}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        feedbackType: item,
                      },
                      () => {
                        this.typeDialog.dismiss();
                      },
                    );
                  }}>
                  <Text
                    style={[
                      item === this.state.feedbackType
                        ? {color: colors.pink}
                        : {},
                      {fontSize: 14},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </PopupDialog>
        <PopupDialog
          dialogTitle={
            <DialogTitle
              title="Biết đến Enow từ?"
              titleStyle={{backgroundColor: colors.gray}}
            />
          }
          width={0.8}
          height={310}
          dialogAnimation={slideAnimation}
          ref={popupDialog => {
            this.fromDialog = popupDialog;
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.data.FromWheres.map((item, index) => (
              <View style={styles.viewScrollSelect} key={`city_${index}`}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        fromWhere: item,
                      },
                      () => {
                        this.fromDialog.dismiss();
                      },
                    );
                  }}>
                  <Text
                    style={[
                      item === this.state.fromWhere ? {color: colors.pink} : {},
                      {fontSize: 14},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </PopupDialog>
      </View>
    );
  }
}
