import React, {Component} from 'react';
import {
  Platform,
  Linking,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  sliderWidth,
  itemWidth,
} from '../../../components/Snap/SliderEntry.style';
import SliderEntry from '../../../components/Snap/SliderEntry';
import styles from '../../../components/Snap/index.style';
import {ENTRIES1} from '../../../components/Snap/entries';
import Modal from 'react-native-simple-modal';
// import RNKakao from 'rn-kakao-login';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const {width, height} = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {
  state = {open: false};
  openModal = () => this.setState({open: true});

  closeModal = () => this.setState({open: false});
  modalDidClose = () => {
    this.setState({open: false});
    console.log('Modal did close.');
  };

  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
    }
  }
  mainExample(number, title) {
    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={10000}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample(
      1,
      'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots',
    );
    return (
      <>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>내 손 안의 동아리 '동방'</Text>
          </View>
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}>
            {example1}
          </ScrollView>
          <View
            style={{
              flex: 1,
              marginTop: height * 0.03,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Schools')}>
              <Text
                style={{
                  color: '#3B3B3B',
                  fontWeight: 'bold',
                  fontSize: height * 0.04,
                }}>
                들어가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: height * 0.01, padding: 10}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{fontSize: height * 0.023, color: '#3B3B3B'}}>
                {' '}
                모임 생성 / 수정{' '}
              </Text>
            </TouchableOpacity>
            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  console.log(result);
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        parameters: {
                          fields: {
                            string:
                              'email,name,first_name,last_name,birthday,gender',
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: height * 0.07,
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <TouchableOpacity
                style={{padding: height * 0.02}}
                onPress={() => this.kakaoLogin()}>
                <Text style={{color: '#888888', fontSize: height * 0.018}}>
                  문의하기
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: height * 0.02,
                  color: '#888888',
                  fontSize: height * 0.015,
                }}>
                v1.0.11
              </Text>
            </View>
          </View>
        </View>
        <Modal
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          open={this.state.open}
          closeOnTouchOutside={true}
          modalStyle={{
            borderRadius: 3,
            margin: 20,
            padding: 10,
            backgroundColor: '#F5F5F5',
          }}>
          <View style={{marginTop: 10, marginBottom: 15, marginLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>문의사항</Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 15, marginBottom: 40}}>
            <Text
              style={{fontSize: width * 0.03, marginBottom: 10}}
              onPress={() => {
                Linking.openURL('tel:01043720440');
              }}>
              010 4372 0440
            </Text>
            <Text style={{fontSize: width * 0.03}}>leejjun28@gmail.com</Text>
          </View>
          <View style={{marginBottom: 5}}>
            <Text style={{color: '#848484', fontSize: width * 0.02}}>
              문의 가능 시간 : 09:00 ~ 18:00
            </Text>
          </View>
        </Modal>
      </>
    );
  }
}
