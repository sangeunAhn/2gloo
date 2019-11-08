import React, {Component} from 'react';
import ClubView from './presenter';
import * as axios from 'axios';

export default class Container extends Component {
  state = {modalVisible: false};

  constructor(props) {
    super(props);
    this.state = {
      clubChar: [],
      disabled: true,
    };
  }

  render() {
    return (
      <ClubView
        {...this.state}
        {...this.props}
        showOverlay={this._showOverlay}
        hideOverlay={this._hideOverlay}
        onClose={this._onClose}
        gotoClubIntroduce={this._gotoClubIntroduce}
        gotoRecord={this._gotoRecord}
        press={this._press}
      />
    );
  }

  UNSAFE_componentWillMount = () => {
    this._getDatas();
  };

  _showOverlay = () => {
    this.setState({modalVisible: true});
  };

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  };

  _onClose = () => this.setState({modalVisible: false});

  _gotoClubIntroduce = () => {
    this._onClose();
    this.props.navigation.navigate('ClubIntroduce', {
      clubNo: this.props.clubNo,
    });
  };

  _gotoRecord = () => {
    this._onClose();
    this.props.navigation.navigate('Record', {
      clubName: this.props.clubName,
      school: this.props.school,
    });
  };

  _getDatas = () => {
    const {clubNo} = this.props;
    const {clubChar} = this.state;

    // 데이터 가져오기
    axios
      .post('http://13.209.221.206/php/Main/GetClubChars.php', {
        clubNo,
      })
      .then(result => {
        const response = result.data;
        var clubCharArray = new Array();

        response.forEach(row => {
          clubCharArray.push(row.chars);
        });

        this.setState({
          clubChar: clubChar.concat(clubCharArray),
        });
      });
  };

  _press = () => {
    this.state.disabled === true
      ? this.setState({disabled: false})
      : this.setState({disabled: true});
  };
}
