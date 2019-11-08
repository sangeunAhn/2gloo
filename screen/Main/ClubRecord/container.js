import React from 'react';
import {Image, Dimensions} from 'react-native';
import * as axios from 'axios';
import ClubRecord from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
    this.state = {
      records: [],
      listRecords: [],
      isGetting: false,
      imageRoom: [],
      recordHeights: [],
      leftRecords: [],
      rightRecords: [],
    };
  }

  render() {
    return (
      <ClubRecord
        {...this.state}
        {...this.props}
        goToPictures={this._goToPictures}
      />
    );
  }

  UNSAFE_componentWillMount = async () => {
    await this._getImageRoom();
    this._recordView();
  };

  _recordView = async () => {
    const {imageRoom} = this.state;
    const t = this;
    if (imageRoom.length !== 0) {
      for (var item of imageRoom) {
        await t._getRecordData(item);
      }
    } else {
      this.setState({recordIsGetting: true});
    }
    await this.setState({listRecords: this.state.records});
    this.setState({recordIsGetting: true});

    await this._getRecordHeight();
    this._distinguishHeight();
  };

  _getRecordHeight = async () => {
    const items = [];
    for (var item of this.state.listRecords) {
      const {uri} = item;
      const [height] = await this._getImageSize(uri);
      items.push({uri, height});
    }
    this.setState({recordHeights: items});
  };

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
    for (var item of this.state.listRecords) {
      const {uri} = item;
      const [height] = await this._getImageSize(uri);
      items.push({uri, height});
    }
    this.setState({recordHeights: items});
  };

  _getImageRoom = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var clubNo = navigation.getParam('clubNo', 'NO-ID');
    const t = this;
    var imageRoomArray = new Array();

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/Main/GetImageRooms2.php', {
        clubNo,
      })
      .then(result => {
        const response = result.data;
        response.forEach(room => {
          imageRoomArray.push(room.imageRoom);
          t.setState({imageRoom: imageRoomArray});
        });
      });
  };

  // 이미지들 가져오기
  _getRecordData = async imageRoom => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var clubNo = navigation.getParam('clubNo', 'NO-ID');
    const t = this;

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/Main/GetImages2.php', {
        clubNo,
        imageRoom,
      })
      .then(async result => {
        const response = result.data;
        var recordArray = new Array();
        await Promise.all(
          response.map(async row => {
            await recordArray.push({uri: row.recordPicture_low});
          }),
        );
        await t.setState({records: [...this.state.records, ...recordArray]});
      });
    // console.log(imageRoom)
  };

  _goToPictures = async item => {
    const t = this;
    await axios
      .post('http://13.209.221.206/php/Main/GetRecordPicture.php', {
        recordPicture_low: item,
      })
      .then(function(response) {
        const recordNo = response.data.message.recordNo;
        t.props.navigation.navigate('RecordPictures', {
          recordNo: recordNo,
        });
      });
  };

  _handleBackButtonClick = () => {
    this.props.navigation.goBack();

    return true;
  };
}

export default Container;
