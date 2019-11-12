import React, {Component} from 'react';
import {Alert, Image} from 'react-native';
import * as axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import MakeClub from './presenter';

class Container extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      clubKind: '학술/교양',
      clubPhoneNumber: '',
      clubIntroduce: '',
      clubLogo_low: null,
      clubMainPicture_low: null,
      prevClubLogo_low: null,
      prevClubMainPicture_low: null,
      clubLogo_high: null,
      clubMainPicture_high: null,
      prevClubLogo_high: null,
      prevClubMainPicture_high: null,
      userNo: '',
      isGetting: false,
      isSubmitting: false,
      isFocused: false,
      isFocused1: false,
      isFocused2: false,
      isFocused3: false,
      photoPermission: '',
      clubSize: 0.5,
      clubAutonomous: 0.5,
      clubFunny: 0.5,
      clubFriendship: 0.5,
    };

    this.props.navigation.addListener('didFocus', async () => {
      this.setState({isSubmitting: false});
    });
  }

  UNSAFE_componentDidMount() {
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({photoPermission: response});
    });
  }

  render() {
    return (
      <MakeClub
        {...this.state}
        {...this.props}
        pickLogo={this._pickLogo}
        pickMainPicture={this._pickMainPicture}
        btnPress={this._btnPress}
        setPrevClubKind={this._setPrevClubKind}
        clubNameChange={this._clubNameChange}
        clubIntroduceChange={this._clubIntroduceChange}
        clubPhoneNumberChange={this._clubPhoneNumberChange}
        clubSizeChange={this._clubSizeChange}
        clubAutonomousChange={this._clubAutonomousChange}
        clubFunnyChange={this._clubFunnyChange}
        clubFriendshipChange={this._clubFriendshipChange}
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

  UNSAFE_componentWillMount = async () => {
    if (this.props.navigation.getParam('from', 'NO-ID') === 'm') {
      await this._getDatas();
    }
  };

  // 데이터 가져오는 함수
  _getDatas = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/MakeClub/GetRegister.php', {
        userNo: userNo,
      })
      .then(response => {
        t._setDatas(response);
      });
  };

  // 데이터 넣기
  _setDatas = async response => {
    var clubName = response.data.message.clubName;
    await this.setState({
      clubName,
    });

    var clubKind = response.data.message.clubKind;
    await this.setState({
      clubKind,
    });

    var clubPhoneNumber = response.data.message.clubPhoneNumber;
    clubPhoneNumber = clubPhoneNumber.replace(/\\n/gi, '\n');
    await this.setState({
      clubPhoneNumber,
    });

    var clubIntroduce = response.data.message.clubIntroduce;
    clubIntroduce = clubIntroduce.replace(/\\n/gi, '\n');
    await this.setState({
      clubIntroduce,
    });

    var clubSize = response.data.message.clubSize * 1;
    await this.setState({
      clubSize,
    });

    var clubAutonomous = response.data.message.clubAutonomous * 1;
    await this.setState({
      clubAutonomous,
    });

    var clubFunny = response.data.message.clubFunny * 1;
    await this.setState({
      clubFunny,
    });

    var clubFriendship = response.data.message.clubFriendship * 1;
    await this.setState({
      clubFriendship,
    });

    var clubLogo_low = response.data.message.clubLogo_low;
    await this.setState({
      clubLogo_low,
      prevClubLogo_low: clubLogo_low,
    });

    var clubMainPicture_low = response.data.message.clubMainPicture_low;
    await this.setState({
      clubMainPicture_low,
      prevClubMainPicture_low: clubMainPicture_low,
    });

    var clubLogo_high = response.data.message.clubLogo_high;
    await this.setState({
      clubLogo_high,
      prevClubLogo_high: clubLogo_high,
    });

    var clubMainPicture_high = response.data.message.clubMainPicture_high;
    await this.setState({
      clubMainPicture_high,
      prevClubMainPicture_high: clubMainPicture_high,
    });

    Image.getSize(this.state.clubLogo_high, (width, height) => {
      console.log(width, height);
    });

    this.setState({isGetting: true});
  };

  // 로고 가져오기
  _pickLogo = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.7,
    };

    const response = await Permissions.request('photo');
    this.setState({photoPermission: response});

    ImagePicker.launchImageLibrary(options, response => {
      Image.getSize(response.uri, (width, height) => {
        console.log(width, height);
      });
      console.log(response.uri);
      this.setState({clubLogo_high: response.uri, clubLogo_low: response.uri});
    });
  };

  // 메인사진 가져오기
  _pickMainPicture = async () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.3,
    };

    const response = await Permissions.request('photo');
    this.setState({photoPermission: response});

    ImagePicker.launchImageLibrary(options, response => {
      this.setState({
        clubMainPicture_high: response.uri,
        clubMainPicture_low: response.uri,
      });
    });
  };

  _notUpdate = () => {
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;
    axios
      .post('http://13.209.221.206/php/MakeClub/GetClubExist.php', {
        userNo,
      })
      .then(async function(response) {
        var result = response.data.message;

        if (result === 'true') {
          await t._updateClub();
          t._deleteImages();
        } else {
          t._makeClub();
        }
      });
  };

  // 처음 가입
  _makeClub = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    var school = navigation.getParam('school', 'NO-ID');

    const {
      clubName,
      clubKind,
      clubPhoneNumber,
      clubIntroduce,
      clubLogo_high,
      clubMainPicture_high,
      clubSize,
      clubAutonomous,
      clubFunny,
      clubFriendship,
    } = this.state;

    if (clubName === '' || clubPhoneNumber === '' || clubIntroduce === '') {
      Alert.alert('내용을 채워주세요');
      this.setState({isSubmitting: false});
    } else {
      let formData = new FormData();
      formData.append('clubName', clubName);
      formData.append('clubKind', clubKind);
      formData.append('clubPhoneNumber', clubPhoneNumber);
      formData.append('clubIntroduce', clubIntroduce);
      formData.append('userNo', userNo);
      formData.append('school', school);
      formData.append('clubSize', clubSize);
      formData.append('clubAutonomous', clubAutonomous);
      formData.append('clubFunny', clubFunny);
      formData.append('clubFriendship', clubFriendship);

      if (clubLogo_high == null) {
        formData.append('clubLogo_high', null);
        formData.append('clubLogo_low', null);
      } else {
        formData.append('clubLogo_high', {
          uri: clubLogo_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
        formData.append('clubLogo_low', {
          uri: clubLogo_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
      }

      if (clubMainPicture_high == null) {
        formData.append('clubMainPicture_high', null);
        formData.append('clubMainPicture_low', null);
      } else {
        formData.append('clubMainPicture_high', {
          uri: clubMainPicture_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
        formData.append('clubMainPicture_low', {
          uri: clubMainPicture_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
      }

      // 데이터베이스에 넣기
      await fetch('http://13.209.221.206/php/MakeClub/MakeClub.php', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
      });
    }
    this.props.navigation.navigate('MakeChars', {
      userNo,
    });
  };

  // 정보 수정 함수
  _updateClub = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var getUserNo = navigation.getParam('userNo', 'NO-ID');
    getUserNo = getUserNo.replace(/[^0-9]/g, '');

    const {
      clubName,
      clubKind,
      clubPhoneNumber,
      clubIntroduce,
      clubLogo_high,
      clubMainPicture_high,
      clubSize,
      clubAutonomous,
      clubFunny,
      clubFriendship,
    } = this.state;

    if (clubName === '' || clubPhoneNumber === '' || clubIntroduce === '') {
      Alert.alert('내용을 채워주세요');
      this.setState({isSubmitting: false});
    } else {
      let formData = new FormData();
      formData.append('clubName', clubName);
      formData.append('clubKind', clubKind);
      formData.append('clubPhoneNumber', clubPhoneNumber);
      formData.append('clubIntroduce', clubIntroduce);
      formData.append('userNo', getUserNo);
      formData.append('clubSize', clubSize);
      formData.append('clubAutonomous', clubAutonomous);
      formData.append('clubFunny', clubFunny);
      formData.append('clubFriendship', clubFriendship);

      if (clubLogo_high == null || clubLogo_high === 'ul') {
        formData.append('clubLogo_high', null);
        formData.append('clubLogo_low', null);
      } else {
        formData.append('clubLogo_high', {
          uri: clubLogo_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
        formData.append('clubLogo_low', {
          uri: clubLogo_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
      }

      if (clubMainPicture_high == null || clubMainPicture_high === 'ul') {
        formData.append('clubMainPicture_high', null);
        formData.append('clubMainPicture_low', null);
      } else {
        formData.append('clubMainPicture_high', {
          uri: clubMainPicture_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
        formData.append('clubMainPicture_low', {
          uri: clubMainPicture_high,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
      }

      // 텍스트 정보 넣기
      await fetch('http://13.209.221.206/php/MakeClub/UpdateClub.php', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
      });
    }
  };

  _deleteImages = async () => {
    const {navigation} = this.props;
    var getUserNo = navigation.getParam('userNo', 'NO-ID');
    const {
      prevClubLogo_low,
      prevClubMainPicture_low,
      prevClubLogo_high,
      prevClubMainPicture_high,
    } = this.state;

    let formData = new FormData();
    formData.append('clubLogo_low', prevClubLogo_low);
    formData.append('clubMainPicture_low', prevClubMainPicture_low);
    formData.append('clubLogo_high', prevClubLogo_high);
    formData.append('clubMainPicture_high', prevClubMainPicture_high);

    await fetch('http://13.209.221.206/php/MakeClub/DeleteClubImages.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
    if (this.props.navigation.getParam('from', 'NO-ID') === 'm') {
      this.props.navigation.navigate('Main', {
        from: 'updateClub',
      });
    } else {
      this.props.navigation.navigate('MakeChars', {
        userNo: getUserNo,
      });
    }
  };

  _btnPress = async () => {
    this.setState({isSubmitting: true});
    if (this.props.navigation.getParam('from', 'NO-ID') === 'm') {
      await this._updateClub();
      this._deleteImages();
    } else {
      this._notUpdate();
    }
  };

  _setPrevClubKind = clubKind => {
    this.setState({clubKind});
  };

  _clubNameChange = clubName => {
    this.setState({clubName});
  };

  _clubIntroduceChange = clubIntroduce => {
    this.setState({clubIntroduce});
  };

  _clubPhoneNumberChange = clubPhoneNumber => {
    this.setState({clubPhoneNumber});
  };

  _clubSizeChange = clubSize => {
    this.setState({clubSize});
  };

  _clubAutonomousChange = clubAutonomous => {
    this.setState({clubAutonomous});
  };

  _clubFunnyChange = clubFunny => {
    this.setState({clubFunny});
  };

  _clubFriendshipChange = clubFriendship => {
    this.setState({clubFriendship});
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
