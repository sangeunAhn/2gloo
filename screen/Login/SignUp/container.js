import React, {Component} from 'react';
import {Alert} from 'react-native';
import * as axios from 'axios';
import SignUp from './presenter';

class Container extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      password2: '',
      email: '',
      picture: null,
      userNo: '',
      school: '상언대학교',
      isGetting: false,
      isSubmitting: false,
      isFocused: false,
      isFocused1: false,
      isFocused2: false,
      isFocused3: false,
    };
  }

  render() {
    return (
      <SignUp
        {...this.state}
        {...this.props}
        btnPress={this._btnPress}
        idChange={this._idChange}
        pwChange={this._pwChange}
        pw2Change={this._pw2Change}
        emailChange={this._emailChange}
        schoolChange={this._schoolChange}
        handleFocus={this._handleFocus}
        handleBlur={this._handleBlur}
        handleFocus1={this._handleFocus1}
        handleBlur1={this._handleBlur1}
        handleFocus2={this._handleFocus2}
        handleBlur2={this._handleBlur2}
        handleFocus3={this._handleFocus3}
        handleBlur3={this._handleBlur3}
      />
    );
  }

  // 처음 가입
  _SignUp = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    const {id, password, email, school} = this.state;

    let formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('school', school);

    // 데이터베이스에 넣기
    await fetch('http://13.209.221.206/php/SignUp/SignUp.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });

    navigation.navigate('Login');
  };

  _existId = () => {
    Alert.alert('같은 ID가 존재합니다.\n 다른 ID를 써주세요');
    this.setState({isSubmitting: false});
  };

  _existEmail = () => {
    Alert.alert('같은 email이 존재합니다.\n 다른 email을 써주세요');
    this.setState({isSubmitting: false});
  };

  _getEmail = () => {
    const {email} = this.state;
    const t = this;
    let ms = '';
    axios
      .post('http://13.209.221.206/php/SignUp/GetEmail.php', {
        email,
      })
      .then(function(response) {
        ms = response.data.message;
        {
          ms === 'true' ? t._existEmail() : t._SignUp();
        }
      });
  };

  _getId = () => {
    const {id} = this.state;
    const t = this;
    let ms = '';
    axios
      .post('http://13.209.221.206/php/SignUp/GetId.php', {
        id,
      })
      .then(function(response) {
        ms = response.data.message;
        {
          ms === 'true' ? t._existId() : t._getEmail();
        }
      });
  };

  _btnPress = async () => {
    const {id, password, password2, email} = this.state;
    this.setState({isSubmitting: true});
    const t = this;
    if (password !== password2) {
      Alert.alert('비밀번호가 맞지 않습니다.');
      this.setState({isSubmitting: false});
    } else if (id.length < 7 || id.length > 14) {
      Alert.alert('ID 길이는 7글자이상 14글자 이하여야 합니다.');
      this.setState({isSubmitting: false});
    } else if (password.length < 7 || password.length > 14) {
      Alert.alert('비밀번호 길이는 7글자이상 14글자 이하여야 합니다.');
      this.setState({isSubmitting: false});
    } else {
      t._getId();
    }
  };

  _idChange = id => {
    this.setState({id});
  };

  _pwChange = password => {
    this.setState({password});
  };

  _pw2Change = password2 => {
    this.setState({password2});
  };

  _emailChange = email => {
    this.setState({email});
  };

  _schoolChange = school => {
    this.setState({school});
  };

  // 테두리 색 변경 효과
  _handleFocus = () => this.setState({isFocused: true});
  _handleBlur = () => this.setState({isFocused: false});

  _handleFocus1 = () => this.setState({isFocused1: true});
  _handleBlur1 = () => this.setState({isFocused1: false});

  _handleFocus2 = () => this.setState({isFocused2: true});
  _handleBlur2 = () => this.setState({isFocused2: false});

  _handleFocus3 = () => this.setState({isFocused3: true});
  _handleBlur3 = () => this.setState({isFocused3: false});
}

export default Container;
