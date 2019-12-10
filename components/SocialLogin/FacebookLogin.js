import React from 'react';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import * as axios from 'axios';

export default class MasonryList extends React.Component {
  constructor(props) {
    super(props);
  }

  _makeUser = async id => {
    const {navigation} = this.props;

    let formData = new FormData();
    formData.append('id', id);

    // 데이터베이스에 넣기
    await fetch('http://13.209.221.206/php/Login/makeUser.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });

    navigation.navigate('RegisterSchool', {
      userId: id,
    });
  };

  _gotoSchool = id => {
    this.props.navigation.navigate('Schools', {
      userId: id,
    });
  };

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      const t = this;
      this._storeData('fb' + result.id);
      axios
        .post('http://13.209.221.206/php/Login/ExistId.php', {
          id: 'fb' + result.id,
        })
        .then(function(response) {
          var ms = response.data.message;
          console.log(ms)
          {
            ms === 'true'
              ? t._existSchool('fb' + result.id)
              : t._makeUser('fb' + result.id);
          }
        });
    }
  };

  _existSchool = id => {
    const t = this;
    axios
      .post('http://13.209.221.206/php/Login/ExistSchool.php', {
        id,
      })
      .then(function(response) {
        var ms = response.data.school;
        console.log(ms);
        {
          ms === null ? t._gotoRegisterSchool(id) : t._gotoSchool(id);
        }
      });
  };

  _gotoRegisterSchool = id => {
    this.props.navigation.navigate('RegisterSchool', {
      userId: id,
    });
  }

  _storeData = id => {
    try {
      AsyncStorage.setItem('userId', id);
    } catch (error) {
      console.log('스토리지에 ID 저장 안됨.');
    }
  };

  render() {
    return (
      <LoginButton
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          width: 220,
          height: 30,
        }}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
              const infoRequest = new GraphRequest(
                '/me',
                {
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,last_name,birthday,gender',
                    },
                    access_token: {
                      string: data.accessToken.toString(),
                    },
                  },
                },
                this._responseInfoCallback,
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    );
  }
}
