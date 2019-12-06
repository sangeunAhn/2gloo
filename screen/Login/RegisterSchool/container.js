import React from 'react';
import {Alert} from 'react-native';
import RegisterSchool from './presenter';
import * as axios from 'axios';

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
    };
  }

  render() {
    return (
      <RegisterSchool
        {...this.props}
        AAPress={this._AAPress}
        BBPress={this._BBPress}
      />
    );
  }

  _AAPress = () => {
    Alert.alert(
      '본인의 학교가 맞으십니까?',
      '',
      [
        {
          text: '아니요',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => this._RegisterSchool('울산대학교'),
        },
      ],
      {cancelable: false},
    );
    // this._RegisterSchool('상언대학교');
  };

  _BBPress = () => {
    Alert.alert(
      '본인의 학교가 맞으십니까?',
      '',
      [
        {
          text: '예',
          onPress: () => this._RegisterSchool('강민대학교'),
          style: 'cancel',
        },
        {
          text: '아니요',
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  _RegisterSchool = async school => {
    const {navigation} = this.props;
    const id = navigation.getParam('userId', 'NO-ID');
    console.log(id, school);
    let formData = new FormData();
    formData.append('id', id);
    formData.append('school', school);

    await fetch('http://13.209.221.206/php/Login/RegisterSchool.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
    navigation.navigate('Schools', {
      userId: id,
    });
  };
}

export default Container;
