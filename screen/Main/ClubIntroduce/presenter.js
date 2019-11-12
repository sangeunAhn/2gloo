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
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Thumbnail, Text} from 'native-base';
import ClubChars from '../../../components/Char/ClubChars';
import SliderView from '../../../components/Introduce/Slider';
import BackButton from '../../../components/Button/BackButton';
import Record from '../../../components/Introduce/Record';

const {width, height} = Dimensions.get('window');
const ClubIntroduce = props => (
  <>
    {/* <ImageView
      images={[
        {
          source: {
            uri: props.clubMainPicture,
          },
          title: '메인사진',
          width: width,
        },
        {
          source: {
            uri: props.clubLogo,
          },
          title: '로고사진',
          width: width,
          height: width,
        },
      ]}
      imageIndex={props.imageViewIndex}
      isVisible={props.isImageViewVisible}
    /> */}
    {props.isGetting1 && props.isGetting2 ? (
      <Swiper paginationStyle={{bottom: 10}} loop={false}>
        <View style={styles.container}>
          <BackButton navigation={props.navigation} />
          {props.clubMainPicture == null ||
          props.clubMainPicture === 'ul' ||
          props.clubMainPicture === '' ? (
            <View style={[styles.mainPicture, {backgroundColor: '#a7bfe8'}]} />
          ) : (
            props.clubMainPicture && (
              <View
                style={styles.mainPicture}
                onPress={props.imageViewVisible1}>
                <ImageBackground
                  blurRadius={2}
                  source={{uri: props.clubMainPicture}}
                  style={styles.mainPicture}
                />
              </View>
            )
          )}

          <View style={{top: -100}}>
            <View style={styles.box}>
              <View style={styles.inBox}>
                <Text style={styles.clubName}>{props.clubName}</Text>
                <Text note style={styles.charText}>
                  {' '}
                  {props.clubChar.map((char, i) => {
                    return <ClubChars fontSize={13} chars={char} key={i} />;
                  })}
                </Text>
              </View>
              {props.clubLogo == null ||
              props.clubLogo === 'ul' ||
              props.clubLogo === '' ? (
                <View style={styles.logo}>
                  <View
                    style={[styles.logoImage, {backgroundColor: '#6190e8'}]}
                  />
                </View>
              ) : (
                props.clubLogo && (
                  <View onPress={props.imageViewVisible2} style={styles.logo}>
                    <Thumbnail
                      source={{uri: props.clubLogo}}
                      style={styles.logoImage}
                    />
                  </View>
                )
              )}
            </View>
          </View>
          <View style={styles.slider}>
            <SliderView {...props} textL={'소규모'} textR={'대규모'} />
            <SliderView {...props} textL={'자율적인'} textR={'체계적인'} />
            <SliderView {...props} textL={'재미있는'} textR={'진지한'} />
            <SliderView {...props} textL={'친목도모'} textR={'활동중심'} />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
          <BackButton navigation={props.navigation} />
          <View>
            <SafeAreaView>
              <Text style={styles.introduceTitle}>모임 소개</Text>
            </SafeAreaView>
          </View>
          <View style={styles.intro}>
            <ScrollView style={styles.introBox} nestedScrollEnabled={true}>
              <Text style={styles.introduceText}>{props.clubIntroduce}</Text>
            </ScrollView>
          </View>
          <Text style={styles.phoneTitle}> 연락처 </Text>
          <ScrollView style={styles.phone}>
            <Text>{props.clubPhoneNumber}</Text>
          </ScrollView>
        </View>
        <Record {...props} />
      </Swiper>
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
    alignItems: 'center',
    flex: 1.8,
    width: '100%',
    height: '100%',
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    height: 180,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  inBox: {
    flex: 1,
    flexDirection: 'column',
    height: 110,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  charText: {alignSelf: 'center', textAlign: 'center', top: -30},
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
    left: width * 0.45 - 55,
    position: 'absolute',
    top: -55,
    zIndex: 1000,
    width: 110,
    height: 110,
    borderRadius: 60,
    alignSelf: 'center',
  },
  logoImage: {
    zIndex: 1000,
    width: 110,
    height: 110,
    borderRadius: 60,
    alignSelf: 'center',
  },
  slider: {
    top: 110,
    flex: 3,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  intro: {
    flex: 12,
    shadowColor: '#E1E1E1',
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 5,
    shadowRadius: 3,
    elevation: 1.5,
  },
  introBox: {
    borderRadius: 5,
    backgroundColor: 'white',
    top: 0,
    marginBottom: width * 0.05,
    marginTop: width * 0.04,
    marginHorizontal: width * 0.07,
    shadowColor: '#E1E1E1',
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 5,
    shadowRadius: 3,
    elevation: 1.5,
  },
  introduceTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 15,
  },
  phone: {
    flex: 1,
    top: -30,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: width * 0.13,
    marginTop: width * 0.04,
    marginHorizontal: width * 0.07,
    shadowColor: '#E1E1E1',
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 5,
    shadowRadius: 3,
    elevation: 1.5,
    width: '85%',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  introduceText: {paddingVertical: 15, paddingHorizontal: 10},
  phoneTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 15,
    top: -30,
  },
});

export default ClubIntroduce;
