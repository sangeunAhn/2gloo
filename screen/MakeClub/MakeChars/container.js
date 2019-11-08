import React from 'react';
import {AsyncStorage} from 'react-native';
import * as axios from 'axios';
import MakeChars from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      clubChars: {},
      chars: {},
      count: 0,
      isSubmitting: false,
      allDelBtn: false,
      idCount: 0,
    };

    this.props.navigation.addListener('didFocus', async () => {
      this.setState({isSubmitting: false});
    });
  }

  render() {
    return (
      <MakeChars
        {...this.state}
        {...this.props}
        screenPress={this._screenPress}
        removeChar={this._removeChar}
        addChar={this._addChar}
        buttonPress={this._buttonPress}
        charPress={this._charPress}
      />
    );
  }

  UNSAFE_componentWillMount = () => {
    this._getChars();

    this.setState({
      text: '',
      chars: [],
    });
  };

  _getChars = () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;
    // 데이터 가져오기
    axios
      .post('http://13.209.221.206/php/MakeClub/GetChars.php', {
        userNo: userNo,
      })
      .then(response => {
        t._setDatas(response);
      });
  };

  _setDatas = async response => {
    const t = this;
    for (var item of response.data) {
      await t._addGetChars(item.chars, item.createdAt);
    }
  };

  _addGetChars = (char, createdAt) => {
    const t = this;
    this.setState(prevState => {
      const ID = t.state.idCount.toString();
      const {count, idCount} = this.state;
      const newCharObject = {
        [ID]: {
          id: ID, // 등록시간
          char: char, // 특성 내용
          delBtn: false,
          createdAt,
        },
      };
      const newState = {
        count: count + 1,
        idCount: idCount + 1,
        chars: {
          ...prevState.chars,
          ...newCharObject,
        },
      };
      return {...newState};
    });
  };

  UNSAFE_componentDidMount = () => {
    AsyncStorage.getItem('chars').then(data => {
      const chars = JSON.parse(data || '[]');
      this.setState({chars});
    });
  };

  _removeChar = async id => {
    await this.setState(prevState => {
      const chars = prevState.chars;
      const count = this.state.count;
      delete chars[id];
      const newState = {
        ...prevState,
        ...chars,
        count: count - 1,
      };
      return {...newState};
    });
    console.log(this.state.count);
  };

  _addChar = char => {
    const t = this;
    this.setState(prevState => {
      const ID = t.state.idCount.toString();
      const {count, idCount} = this.state;
      const newCharObject = {
        [ID]: {
          id: ID, // 등록시간
          char: char, // 특성 내용
          delBtn: false,
          createdAt: Date.now(),
        },
      };
      const newState = {
        count: count + 1,
        idCount: idCount + 1,
        chars: {
          ...prevState.chars,
          ...newCharObject,
        },
      };
      return {...newState};
    });
  };

  _screenPress = async () => {
    const chars = this.state.chars;
    await this.setState({chars: {}});
    this.setState({chars});
  };

  _buttonPress = () => {
    const {navigation} = this.props;
    this.setState({isSubmitting: true});
    var userNo = navigation.getParam('userNo', 'NO-ID');
    this._updateClubChars();
    if (this.props.navigation.getParam('from', 'NO-ID') === 'm') {
      navigation.navigate('Main', {
        from: 'updateClub',
      });
    } else {
      navigation.navigate('MakeRecord', {
        userNo: userNo,
      });
    }
  };

  _setClubChars = async () => {
    const {chars} = this.state;
    const t = this;

    await Promise.all(
      Object.values(chars).map(char => t._inputDatas(char.id, char.char)),
    );
  };

  _inputDatas = async (id, char) => {
    const {navigation} = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');

    let formData = new FormData();
    formData.append('createdAt', id);
    formData.append('chars', char);
    formData.append('userNo', userNo);

    await fetch('http://13.209.221.206/php/MakeClub/SetClubChars.php', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  _updateClubChars = async () => {
    const {navigation} = this.props;
    const {chars} = this.state;
    const t = this;
    var userNo = navigation.getParam('userNo', 'NO-ID');

    await axios.post('http://13.209.221.206/php/MakeClub/DeleteClubChars.php', {
      userNo: userNo,
    });

    await Promise.all(
      Object.values(chars).map(char => t._inputDatas(char.id, char.char)),
    );
  };
}

export default Container;
