import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import * as colors from '../../constants/colors';
import styles from './styles';

import LoadMore from '../../components/Loading/LoadMore';
import LoadingOverlay from '../../components/Loading/LoadingOverLay';

//import GoogleStracker from '../services/google-analytic-stracker';

class Notification extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Thông báo',
      headerRight: (
        <View>
          {params.isLoginSuccess ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('NotifySetting')}>
              <Image
                style={styles.headerIcon}
                source={require('../../assets/icon_setting.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ),
    };
  };

  state = {
    isLoading: true,
    isRefresh: false,
    isFinish: false,
    data: [],
    lastId: 0,
    type: 1,
    showOverlay: false,
  };

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const {isLoginSuccess} = this.props;
    this.props.navigation.setParams({
      isLoginSuccess: isLoginSuccess,
    });
    this.setState(
      {
        type: isLoginSuccess ? 2 : 1,
        isLoading: true,
      },
      () => {
        this.getData();
      },
    );

    //GoogleStracker.trackScreenView('Thông báo');
  };

  changeTab = type => {
    const {isLoginSuccess} = this.props;
    if (!isLoginSuccess && type === 2) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        type: type,
      });
    }
  };

  componentDidUpdate(prevProps) {
    const {isLoginSuccess} = this.props;
    if (isLoginSuccess !== prevProps.isLoginSuccess) {
      this.props.navigation.setParams({
        isLoginSuccess: isLoginSuccess,
      });
      if (isLoginSuccess) {
        this.getData();
      }
    }
  }

  onPress = item => {
    // if (item.Unread) {
    //   item.Unread = false;
    //   this.setState(
    //     prevState => ({
    //       data: [...prevState.data, ...item],
    //     }),
    //     () => {
    //       //API.updateNotifyStatus(item.Id);
    //     },
    //   );
    // }
    // switch (item.ObjectType) {
    //   case Enum.ObjectTypes.Photo: {
    //     this.props.navigation.navigate('Album', {id: item.ObjectId});
    //     break;
    //   }
    //   case Enum.ObjectTypes.Place: {
    //     this.props.navigation.navigate('PlaceDetail', {id: item.ObjectId});
    //     break;
    //   }
    // }
  };
  gotoComment = (type, id) => {
    // switch (type) {
    //   case Enum.PageType.PhotoDetail: {
    //     this.props.navigation.navigate('Album', {id: id});
    //     break;
    //   }
    //   case Enum.PageType.PlaceReviewDetail: {
    //     this.props.navigation.navigate('ReviewDetail', {
    //       id: id,
    //       type: Enum.MEDIA_TYPE.Place,
    //     });
    //     break;
    //   }
    // }
  };
  gotoUser = id => {
    this.setState(
      {
        showOverlay: true,
      },
      () => {
        // API.getUserInfo(id).then(result => {
        //   this.setState(
        //     {
        //       showOverlay: false,
        //     },
        //     () => {
        //       if (typeof result === 'string') {
        //         Alert.alert('Thông báo', result);
        //       } else {
        //         if (result.status === 200) {
        //           this.props.navigation.navigate('UserFollowed', {
        //             data: result.data,
        //           });
        //         } else {
        //           let message = result.data ? result.data : result._response;
        //           Alert.alert('Thông báo', message);
        //         }
        //       }
        //     },
        //   );
        // });
      },
    );
  };
  renderItem = ({item, index}) => {
    return (
      <View key={item.Id}>
        <TouchableOpacity
          onPress={() => {
            this.onPress(item);
          }}
          style={[
            item.Unread
              ? {backgroundColor: '#eaeaea', borderBottomColor: colors.white}
              : {backgroundColor: '#ffffff', borderBottomColor: colors.gray},
            styles.itemContainer,
          ]}>
          <View>
            <Image
              source={{uri: item.RepresentImg}}
              style={{width: 50, height: 50, marginRight: 10, borderRadius: 25}}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: 'black'}}>{item.Content}</Text>
            <Text style={{color: 'black'}}>{item.CreatedOnString}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  onRefresh = () => {
    this.setState(
      {
        lastId: 0,
        isRefresh: true,
        isFinish: false,
      },
      () => {
        this.getData();
      },
    );
  };
  onEndReached = () => {
    const {isLoading, lastId, isFinish} = this.state;
    if (!isLoading && lastId > 0 && !isFinish) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          this.getData();
        },
      );
    }
  };
  getData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.getNotify();
      },
    );
  };
  getNotify = () => {
    // API.getNotifies(this.state.lastId).then(result => {
    //   if (typeof result === 'string') {
    //     this.setState(
    //       {
    //         isLoading: false,
    //         isRefresh: false,
    //       },
    //       () => {
    //         Alert.alert('Thông báo', result);
    //       },
    //     );
    //   } else {
    //     if (result.status === 200) {
    //       this.setState(prevState => ({
    //         isLoading: false,
    //         isRefresh: false,
    //         data:
    //           prevState.lastId === 0
    //             ? result.data.Items
    //             : [...prevState.data, ...result.data.Items],
    //         lastId: result.data.LastId,
    //         isFinish: prevState.lastId === result.data.LastId,
    //       }));
    //     } else {
    //       this.setState(
    //         {
    //           isLoading: false,
    //           isRefresh: false,
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
  renderFooter = () => {
    const {isFinish} = this.state;
    return <LoadMore isVisible={!isFinish} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <LoadingOverlay isVisible={this.state.showOverlay} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              this.state.type === 1
                ? {borderBottomColor: colors.pink}
                : {borderBottomColor: colors.gray},
              styles.tabItem,
            ]}
            onPress={() => {
              this.changeTab(1);
            }}>
            <Text style={styles.tabText}>Tin mới</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state.type === 2
                ? {borderBottomColor: colors.pink}
                : {borderBottomColor: colors.gray},
              styles.tabItem,
            ]}
            onPress={() => {
              this.changeTab(2);
            }}>
            <Text style={styles.tabText}>Của tôi</Text>
          </TouchableOpacity>
        </View>
        {this.state.type === 1 ? (
          <View style={styles.noDataContent}>
            <Text>Tính năng đang được cập nhật.</Text>
          </View>
        ) : (
          <FlatList
            refreshing={this.state.isRefresh}
            onRefresh={this.onRefresh}
            data={this.state.data}
            keyExtractor={(item, index) => `item_${index}`}
            renderItem={this.renderItem}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.auth.isLoginSuccess,
  };
};
export default connect(mapStateToProps)(Notification);
