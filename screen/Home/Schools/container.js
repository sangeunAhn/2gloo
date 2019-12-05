import React from 'react';
import Schools from './presenter';
import * as axios from 'axios';
import {ToastAndroid, BackHandler} from 'react-native';

class Container extends React.Component {
  static navigationOptions = {
    // gesturesEnabled: false,
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userSchool: '',
      userNo: '',
    };
  }

  UNSAFE_componentWillMount = () => {
    this._getUserData();
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // // 이벤트 해제
  componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  // 이벤트 동작
  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.props.navigation.isFocused()) {
      if (this.exitApp == undefined || !this.exitApp) {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;
        console.log(this.exitApp);
        this.timeout = setTimeout(
          () => {
            this.exitApp = false;
          },
          2000, // 2초
        );
      } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp(); // 앱 종료
      }
      return true;
    }
  };

  render() {
    return (
      <Schools
        {...this.props}
        AAPress={this._AAPress}
        BBPress={this._BBPress}
        onSwipeRight={this._onSwipeRight}
      />
    );
  }

  _getUserData = () => {
    const {navigation} = this.props;
    var t = this;
    const userId = navigation.getParam('userId', 'NO-ID');
    axios
      .post('http://13.209.221.206/php/Main/GetUserData.php', {
        id: userId,
      })
      .then(function(response) {
        var userNo = response.data.message.userNo;
        var userSchool = response.data.message.school;
        t.setState({
          userNo,
          userSchool,
        });
      });
  };

  _AAPress = () => {
    const {userSchool, userNo} = this.state;
    const {navigation} = this.props;
    navigation.navigate('Main', {
      schoolName: '울산대학교',
      userSchool,
      userNo,
    });
  };
}

export default Container;
