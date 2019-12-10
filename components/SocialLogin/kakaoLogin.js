import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  Image,
  YellowBox,
  TouchableOpacity,
} from 'react-native';
import * as axios from 'axios';
import KakaoLogins from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};

export default function App(props) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));

    KakaoLogins.login()
      .then(result => {
        setToken(result.accessToken);
        logCallback(
          `Login Finished:${JSON.stringify(result)}`,
          setLoginLoading(false),
        );
        getProfile();
      })
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };

  const getProfile = () => {
    logCallback('Get Profile Start', setProfileLoading(true));

    KakaoLogins.getProfile()
      .then(async result => {
        await setProfile(result);
        await logCallback(
          `Get Profile Finished:${JSON.stringify(result)}`,
          setProfileLoading(false),
        );
        _existId(result.id);
        _storeData(result.id);
      })
      .catch(err => {
        logCallback(
          `Get Profile Failed:${err.code} ${err.message}`,
          setProfileLoading(false),
        );
      });
  };

  const _storeData = id => {
    try {
      AsyncStorage.setItem('userId', 'kakao' + id);
    } catch (error) {
      console.log('스토리지에 ID 저장 안됨.');
    }
  };


  const _existId = id => {
    axios
      .post('http://13.209.221.206/php/Login/ExistId.php', {
        id: 'kakao' + id,
      })
      .then(function(response) {
        var ms = response.data.message;
        {
          ms === 'true' ? _existSchool('kakao' + id) : _makeUser('kakao' + id);
        }
      });
  };

  const _makeUser = async id => {
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

    props.navigation.navigate('RegisterSchool', {
      userId: id,
    });
  };

  const _existSchool = id => {
    axios
    .post('http://13.209.221.206/php/Login/ExistSchool.php', {
      id,
    })
    .then(function(response) {
      var ms = response.data.school;
      console.log(ms)
      {
        ms === null ? _gotoRegisterSchool(id) : _gotoSchool(id)
      }
    });
  }

  const _gotoSchool = id => {
    props.navigation.navigate('Schools', {
      userId: id,
    });
  };

  const _gotoRegisterSchool = id => {
    props.navigation.navigate('RegisterSchool', {
      userId: id,
    });
  }


  return (
    <TouchableOpacity
      style={{
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#F7E314',
        width: 220,
        height: 30,
      }}
      onPress={kakaoLogin}>
      <Image
        style={{width: 220, borderRadius: 3, height: 30}}
        source={require('../../images/kakao.png')}
      />
    </TouchableOpacity>
  );
}

YellowBox.ignoreWarnings(['source.uri']);
