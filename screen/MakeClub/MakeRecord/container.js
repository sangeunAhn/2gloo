import React from 'react';
import {Image, Dimensions} from 'react-native';
import * as axios from 'axios';
import MakeRecord from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
    this.state = {
      records: [],
      count: 0,
      isGetting: false,
      imageRoom: [],
      recordHeights: [],
      leftRecords: [],
      rightRecords: [],
    };

    this.props.navigation.addListener('didFocus', async () => {
      await this.setState({isGetting: false, records: [], count: 0});
      await this._getImageRoom();
      const {imageRoom} = this.state;
      const t = this;

      if (imageRoom.length !== 0) {
        for (var item of imageRoom) {
          await t._getDatas(item);
        }
      } else {
        this.setState({isGetting: true});
      }
      this.setState({isGetting: true});

      await this._getRecordHeight();
      this._distinguishHeight();
    });
  }

  render() {
    return (
      <MakeRecord
        {...this.state}
        {...this.props}
        RecordRegister={this._RecordRegister}
        btnPress={this._btnPress}
        iconPress={this._iconPress}
      />
    );
  }

  _getImageSize = async uri =>
    new Promise(resolve => {
      Image.getSize(uri, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const getHeight = (height * screenWidth * 0.5 - 22) / width;
        resolve([getHeight]);
      });
    });

  _distinguishHeight = async () => {
    const recordHeights = this.state.recordHeights;
    var leftHeight = 0,
      rightHeight = 0;
    var leftRecords = [];
    var rightRecords = [];

    for (var i = 0; i < recordHeights.length; i++) {
      if (leftHeight <= rightHeight) {
        leftHeight += recordHeights[i].height;
        await leftRecords.push(recordHeights[i]);
      } else {
        rightHeight += recordHeights[i].height;
        await rightRecords.push(recordHeights[i]);
      }
    }

    this.setState({
      leftRecords,
      rightRecords,
    });
  };

  _getRecordHeight = async () => {
    const items = [];
    for (var item of this.state.records) {
      const {uri} = item;
      const [height] = await this._getImageSize(uri);
      items.push({uri, height});
    }
    this.setState({recordHeights: items});
  };

  _getImageRoom = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;
    var imageRoomArray = new Array();

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/MakeClub/GetImageRooms.php', {
        userNo: userNo,
      })
      .then(async result => {
        const response = result.data;
        for (var room of response) {
          await imageRoomArray.push(room.imageRoom);
          await t.setState({
            count: this.state.count + 1,
            imageRoom: imageRoomArray,
          });
        }
      });
  };

  // 이미지들 가져오기
  _getDatas = async imageRoom => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/MakeClub/GetImages.php', {
        userNo: userNo,
        imageRoom: imageRoom,
      })
      .then(async result => {
        const response = result.data;
        var recordArray = new Array();
        await Promise.all(
          response.map(async row => {
            await recordArray.push({uri: row.recordPicture_low});
            await t.setState({count: this.state.count + 1});
          }),
        );
        await t.setState({records: [...this.state.records, ...recordArray]});
      });
  };

  _RecordRegister = async item => {
    var t = this;
    var userNo = this.props.navigation.getParam('userNo', 'NO-ID');
    await axios
      .post('http://13.209.221.206/php/MakeClub/GetRecordPicture.php', {
        recordPicture: item,
      })
      .then(function(response) {
        var recordNo = response.data.message.recordNo;
        t.props.navigation.navigate('MakeRecordPictures', {
          recordNo: recordNo,
          image: item,
          userNo: userNo,
          to: 'm',
        });
      });
  };

  _goToMain = () => {
    var t = this;
    var userNo = this.props.navigation.getParam('userNo', 'NO-ID');
    axios
      .post('http://13.209.221.206/php/MakeClub/GetSchool.php', {
        userNo: userNo,
      })
      .then(function(response) {
        var school = response.data.message.school;
        t.props.navigation.navigate('Main', {
          schoolName: school,
          userSchool: school,
          userNo,
          from: 'makeRecord',
        });
      });
  };

  _btnPress = () => {
    this._goToMain();
  };

  _iconPress = () => {
    var userNo = this.props.navigation.getParam('userNo', 'NO-ID');
    this.props.navigation.navigate('MakeRecordPictures', {
      userNo,
    });
  };

  _handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
}

export default Container;
