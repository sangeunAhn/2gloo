import React from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native';
import NoticeBoard from './presenter';
import * as axios from 'axios';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');
export default class Container extends React.Component {
  state = {open: false};
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      isLoading: true,
      swipedAll: false,
    };
    this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
  }

  UNSAFE_componentWillMount = async () => {
    await this._getdData();
    this.setState({isLoading: false});
  };

  _getdData = async () => {
    //userNo 가지고 오기
    const {navigation} = this.props;
    var schoolName = navigation.getParam('schoolName', 'NO-ID');
    // var schoolName = '울산대학교'
    const t = this;

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/Main/GetNoticeImages.php', {
        school: schoolName,
      })
      .then(async result => {
        const response = result.data;
        var imageArray = new Array();
        await Promise.all(
          response.map(async row => {
            await imageArray.push({uri: row.noticeImage, link: row.link});
          }),
        );
        await t.setState({images: [...this.state.images, ...imageArray]});
      });
  };

  _openWebView = (webUri) => {
    this.props.navigation.navigate('WebView',{
      webUri
    })
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={{width: width - 44, height: height * 0.82}}
          onPress={() => this._openWebView(card.link)}>
          <FastImage
            style={{width: width - 44, height: height * 0.82}}
            source={{uri: card.uri}}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onSwipedAll = () => {
    this.setState({swipedAll:true})
  }

  reset = async () => {
    this.setState({swipedAll: false});
  }

  render() {
    return (
      <NoticeBoard
        {...this.props}
        {...this.state}
        renderCard={this.renderCard}
        reset={this.reset}
        onSwipedAll={this.onSwipedAll}
      />
    );
  }

  _handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    height: height*0.8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FAFAFA',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    
    top: height > 800 ? 0 : -25 
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
