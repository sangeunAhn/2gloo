import React from 'react';
import Home from './presenter';
import * as axios from 'axios';
import {ToastAndroid, BackHandler} from 'react-native';

class Container extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userSchool: '',
      userNo: '',
      open: false,
    };
  }

  openModal = () => this.setState({open: true});

  closeModal = () => this.setState({open: false});
  modalDidClose = () => {
    this.setState({open: false});
    console.log('Modal did close.');
  };

  UNSAFE_componentWillMount = () => {
    this._getUserData();
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // 이벤트 해제
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
      <Home
        {...this.props}
        {...this.state}
        enterBtnPress1={this._enterBtnPress1}
        schoolBtnPress1={this._schoolBtnPress1}
        enterBtnPress2={this._enterBtnPress2}
        schoolBtnPress2={this._schoolBtnPress2}
        openModal={this.openModal}
        closeModal={this.closeModal}
        modalDidClose={this.modalDidClose}
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

  _enterBtnPress1 = () => {
    console.log('ss')
    const {userSchool, userNo} = this.state;
    const {navigation} = this.props;
    navigation.navigate('Club', {
      schoolName: userSchool,
      userSchool,
      userNo,
    });
  };

  _schoolBtnPress1 = () => {
    const {userSchool, userNo} = this.state;
    const {navigation} = this.props;
    navigation.navigate('Schools', {
      userSchool,
      userNo,
    });
  }

  _enterBtnPress2 = () => {
    const {userSchool, userNo} = this.state;
    const {navigation} = this.props;
    navigation.navigate('NoticeBoard', {
      schoolName: userSchool,
      userSchool,
      userNo,
    });
  };

  _schoolBtnPress2 = () => {
    const {userSchool, userNo} = this.state;
    const {navigation} = this.props;
    navigation.navigate('Schools2', {
      userSchool,
      userNo,
    });
  }
}

export default Container;
