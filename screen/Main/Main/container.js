import React, {Component} from 'react';
import * as axios from 'axios';
import Main from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {open: false};
  openModal = () => this.setState({open: true});

  closeModal = () => this.setState({open: false});
  modalDidClose = () => {
    this.setState({open: false});
    console.log('Modal did close.');
  };
  constructor(props) {
    super(props);
    this.state = {
      kindsOrder: [],
      collapseArray: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      existClub: '생성',
    };
    this.props.navigation.addListener('didFocus', async () => {
      if (
        this.props.navigation.getParam('from', 'NO-ID') === 'makeRecord' ||
        this.props.navigation.getParam('from', 'NO-ID') === 'updateClub'
      ) {
        this._KindsOrder();
        this._ExistClub();
      }
    });
  }

  UNSAFE_componentWillMount = () => {
    this._KindsOrder();
    this._ExistClub();
  };

  _KindsOrder = () => {
    var kinds = [
      '학술/교양',
      '예술/문화/공연',
      '체육',
      '취업',
      '창업',
      '기타',
      '봉사/사회',
      '어학',
      '친목',
      '오락/게임',
    ];
    var kindsOrder = [];
    let someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    someArray.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < 10; i++) {
      kindsOrder.push(kinds[someArray[i] - 1]);
    }
    this.setState({kindsOrder});
  };

  _goToUpdateClub = () => {
    const {navigation} = this.props;
    const userNo = navigation.getParam('userNo', 'NO-ID');
    navigation.navigate('UpdateClub', {
      userNo,
    });
  };

  _goToCreateClub = () => {
    const {navigation} = this.props;
    const userNo = navigation.getParam('userNo', 'NO-ID');
    const school = navigation.getParam('schoolName', 'NO-ID');

    navigation.navigate('MakeClub', {
      userNo,
      school,
    });
  };

  _ExistClub = () => {
    const {navigation} = this.props;
    const userNo = navigation.getParam('userNo', 'NO-ID');
    var t = this;
    axios
      .post('http://13.209.221.206/php/MakeClub/GetClubExist.php', {
        userNo,
      })
      .then(function(response) {
        var result = response.data.message;
        if (result === 'true') {
          t.setState({existClub: '수정'});
        } else {
          t.setState({existClub: '생성'});
        }
      });
  };

  _changeCollapseArray = (isCollapsed, i) => {
    this.setState(this.state.collapseArray.splice(i, 1, isCollapsed));
  };

  render() {
    const {navigation} = this.props;
    const schoolName = navigation.getParam('schoolName', 'NO-ID');
    const userSchool = navigation.getParam('userSchool', 'NO-ID');
    return (
      <Main
        {...this.state}
        {...this.props}
        schoolName={schoolName}
        userSchool={userSchool}
        openModal={this.openModal}
        closeModal={this.closeModal}
        modalDidClose={this.modalDidClose}
        goToUpdateClub={this._goToUpdateClub}
        goToCreateClub={this._goToCreateClub}
        ExistClub={this._ExistClub}
        changeCollapseArray={this._changeCollapseArray}
      />
    );
  }
}

export default Container;
