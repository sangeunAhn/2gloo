import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Thumbnail, Text} from 'native-base';
import ClubChars from '../../../components/Char/ClubChars';
import SliderView from '../../../components/Introduce/Slider';
import BackButton2 from '../../../components/Button/BackButton2';
import BackButtonW from '../../../components/Button/BackButtonW';
import Record from '../../../components/Introduce/Record';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../../components/Scaling';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const {width, height} = Dimensions.get('window');

const ClubIntroduce = props => (
  <>
    {props.isGetting1 && props.isGetting2 ? (
      <>
        <Swiper
          paginationStyle={{bottom: Platform.OS === 'ios' ? 15 : 10}}
          loop={false}>
          <View style={styles.container}>
            <StatusBar translucent={true} />
            <BackButtonW navigation={props.navigation} />
            {/*  */}
            <Menu
              style={{
                position: 'absolute',
                right: 2,
                top: Platform.OS === 'ios' ? 35 : 20,
                zIndex: 1,
                // backgroundColor: 'red',
              }}>
              <MenuTrigger
                style={{
                  paddingVertia: 5,
                  paddingHorizontal: 10,
                }}>
                <SafeAreaView>
                  <Icon
                    name="dots-three-horizontal"
                    size={20}
                    color={'white'}
                  />
                </SafeAreaView>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  paddingLeft: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  width: 130,
                  height: 40,
                  justifyContent: 'space-around',
                }}>
                <MenuOption
                  value={2}
                  style={{marginTop: 3}}
                  onSelect={() =>
                    Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
                  }
                  text="신고하기"
                />
              </MenuOptions>
            </Menu>
            {/*  */}
            {props.clubMainPicture == null ||
            props.clubMainPicture === 'ul' ||
            props.clubMainPicture === '' ? (
              <View style={[styles.mainPicture, {backgroundColor: '#ADCDE9'}]}>
                <ImageBackground
                  // blurRadius={2}
                  // source={{uri: props.clubMainPicture}}
                  style={styles.mainPicture}>
                  {/* <LinearGradient
                    colors={['rgba(128, 128, 128, 0)', 'rgba(0, 0, 0, 1)']}
                    style={{
                      width: width,
                      height: height * 0.4,
                      justifyContent: 'flex-end',
                    }}> */}
                    <View style={{marginLeft: 15, marginBottom: 14}}>
                      <Text style={styles.clubName}>{props.clubName}</Text>
                      <Text note style={styles.charText}>
                        {' '}
                        {props.clubChar.map((char, i) => {
                          return (
                            <ClubChars
                              color={'white'}
                              fontSize={13}
                              chars={char}
                              key={i}
                            />
                          );
                        })}
                      </Text>
                    </View>
                  {/* </LinearGradient> */}
                </ImageBackground>
                {props.clubLogo == null ||
                props.clubLogo === 'ul' ||
                props.clubLogo === '' ? (
                  <View
                    onPress={props.imageViewVisible2}
                    style={[styles.logo, {backgroundColor: '#CEE1F2'}]}>
                  </View>
                ) : (
                  props.clubLogo && (
                    <View
                      onPress={props.imageViewVisible2}
                      style={[styles.logo]}>
                      <Thumbnail
                        source={{uri: props.clubLogo}}
                        style={styles.logoImage}
                      />
                    </View>
                  )
                )}
                {props.clubKakao === '' ? (
                  <></>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL(props.clubKakao)}>
                    <Image
                      style={{
                        position: 'absolute',
                        width: 45,
                        height: 45,
                        right: 4,
                        bottom: 28,
                      }}
                      source={require('../../../images/kakaoLogo.png')}
                    />
                  </TouchableWithoutFeedback>
                )}
              </View>
            ) : (
              props.clubMainPicture && (
                <View
                  style={styles.mainPicture}
                  onPress={props.imageViewVisible1}>
                  <ImageBackground
                    // blurRadius={2}
                    source={{uri: props.clubMainPicture}}
                    style={styles.mainPicture}>
                    <LinearGradient
                      colors={['rgba(128, 128, 128, 0)', 'rgba(0, 0, 0, 1)']}
                      style={{
                        width: width,
                        height: height * 0.3,
                        justifyContent: 'flex-end',
                      }}>
                      {/* <View opacity={0.5} style={{height:height*0.3, justifyContent:'flex-end', backgroundColor:'red'}}> */}
                      <View style={{marginLeft: 15, marginBottom: 14}}>
                        <Text style={styles.clubName}>{props.clubName}</Text>
                        <Text note style={styles.charText}>
                          {' '}
                          {props.clubChar.map((char, i) => {
                            return (
                              <ClubChars
                                color={'white'}
                                fontSize={13}
                                chars={char}
                                key={i}
                              />
                            );
                          })}
                        </Text>
                      </View>
                      {/* </View> */}
                    </LinearGradient>
                  </ImageBackground>
                  {props.clubLogo == null ||
                  props.clubLogo === 'ul' ||
                  props.clubLogo === '' ? (
                    <View
                      onPress={props.imageViewVisible2}
                      style={[styles.logo, {backgroundColor: '#6190E8'}]}>
                      <View
                        style={[
                          styles.logoImage,
                          {backgroundColor: '#6190E8', width: 30, height: 30},
                        ]}
                      />
                    </View>
                  ) : (
                    props.clubLogo && (
                      <View
                        onPress={props.imageViewVisible2}
                        style={[styles.logo]}>
                        <Thumbnail
                          source={{uri: props.clubLogo}}
                          style={styles.logoImage}
                        />
                      </View>
                    )
                  )}
                  {props.clubKakao === '' ? (
                    <></>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => Linking.openURL(props.clubKakao)}>
                      <Image
                        style={{
                          position: 'absolute',
                          width: 45,
                          height: 45,
                          right: 4,
                          bottom: 28,
                        }}
                        source={require('../../../images/kakaoLogo.png')}
                      />
                    </TouchableWithoutFeedback>
                  )}
                </View>
              )
            )}
            <View style={styles.slider}>
              <SliderView {...props} textL={'소규모'} textR={'대규모'} />
              <SliderView {...props} textL={'자율적인'} textR={'체계적인'} />
              <SliderView {...props} textL={'재미있는'} textR={'진지한'} />
              <SliderView {...props} textL={'친목도모'} textR={'활동중심'} />
            </View>
            {/* </GestureRecognizer> */}
          </View>

          <View style={styles.container}>
            <BackButton2 navigation={props.navigation} />
            {/*  */}
            <Menu
              style={{
                position: 'absolute',
                right: 2,
                top: Platform.OS === 'ios' ? 35 : 20,
                zIndex: 1,
                // backgroundColor: 'red',
              }}>
              <MenuTrigger
                style={{
                  paddingVertia: 5,
                  paddingHorizontal: 10,
                }}>
                <SafeAreaView>
                  <Icon name="dots-three-horizontal" size={20} />
                </SafeAreaView>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  paddingLeft: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  width: 130,
                  height: 40,
                  justifyContent: 'space-around',
                }}>
                <MenuOption
                  value={2}
                  style={{marginTop: 3}}
                  onSelect={() =>
                    Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
                  }
                  text="신고하기"
                />
              </MenuOptions>
            </Menu>
            {/*  */}
            <View style={styles.intro}>
              <ScrollView style={styles.introBox} nestedScrollEnabled={true}>
                <Text style={styles.introduceTitle}>Introduce</Text>
                <Text style={styles.introduceText}>{props.clubIntroduce}</Text>
              </ScrollView>
            </View>
            <View style={styles.phoneView}>
              <ScrollView style={styles.phone}>
                <Text style={styles.phoneTitle}>Phone number</Text>
                <Text style={styles.phoneText}>{props.clubPhoneNumber}</Text>
              </ScrollView>
            </View>
          </View>

          <Record {...props} />
        </Swiper>
        <View style={styles.backSwipe} />
      </>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    )}
  </>
);

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: 30,
    height: 40,
    top: Platform.OS === 'ios' ? 30 : 15,
    left: width * 0.028,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  mainPicture: {
    justifyContent: 'flex-end',
    flex: 2.5,
    width: '100%',
    height: '100%',
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    height: 180,
    padding: 10,
    borderRadius: 10,
    // flexDirection: 'row',
  },
  inBox: {
    flex: 1,
    flexDirection: 'column',
    height: 110,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  clubName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 1,
    marginBottom: 8,
  },
  charText: {
    color: 'white',
    width: '80%',
  },
  recordBtn: {
    justifyContent: 'center',
    width: 80,
    height: 25,
    backgroundColor: '#a7bfe8',
    borderRadius: 10,
  },
  recordText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  logo: {
    right: 25,
    position: 'absolute',
    bottom: -31,
    zIndex: 1000,
    width: 62,
    height: 62,
    borderRadius: 31,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoImage: {
    zIndex: 1000,
    width: 62,
    height: 62,
    borderRadius: 60,
    alignSelf: 'center',
    elevation: 4,
  },
  slider: {
    top: 55,
    flex: 3,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  intro: {
    flex: 4,
    shadowColor: '#E1E1E1',
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 5,
    shadowRadius: 3,
    elevation: 1.5,
    marginTop: 10,
  },
  introBox: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 70,
    marginHorizontal: 5,
  },
  introduceTitle: {
    marginTop: 5,
    marginLeft: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  phoneView: {
    flex: 1,
    shadowColor: '#E1E1E1',
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 5,
    shadowRadius: 3,
  },
  phone: {
    flex: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 30,
  },
  introduceText: {
    color: '#8D8D8D',
    fontSize: moderateScale(12.5),
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  phoneTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 8,
  },
  phoneText: {
    color: '#8D8D8D',
    fontSize: moderateScale(12.5),
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  backSwipe: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: 20,
    height: height,
    zIndex: 10,
    // backgroundColor:'red'
  },
});

export default ClubIntroduce;
