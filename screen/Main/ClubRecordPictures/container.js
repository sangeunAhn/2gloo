import React, {Component} from 'react';
import * as axios from 'axios';
import ClubRecordPictures from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
    this.state = {
      isGetting: false,
      getDatas: '',
    };
  }

  render() {
    return <ClubRecordPictures {...this.state} {...this.props} />;
  }

  UNSAFE_componentWillMount = () => {
    this._getDatas();
  };

  _getDatas = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var recordNo = navigation.getParam('recordNo', 'NO-ID');
    const t = this;
    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/Main/GetRecordPictureM.php', {
        recordNo: recordNo,
      })
      .then(function(response) {
        t.setState({getDatas: response.data});
      });

    this.setState({isGetting: true});
  };

  _handleBackButtonClick = () => {
    this.props.navigation.goBack();

    return true;
  };
}

export default Container;
