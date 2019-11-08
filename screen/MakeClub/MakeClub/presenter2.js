import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ConfirmButton from '../../../components/Button/ConfirmButton';
import ClubPicker from '../../../components/MakeClub/ClubPicker';
import ClubPickerM from '../../../components/MakeClub/ClubPickerM';
import ConfirmButtonN from '../../../components/Button/ConfirmButtonN';
import HeaderScrollView from 'react-native-header-scroll-view';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Slider} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const MakeClub2 = props => (
  <HeaderScrollView
    headerContainerStyle={styles.headerContainerStyle}
    headlineStyle={styles.headlineStyle}
    headerComponentContainerStyle={styles.headerComponentContainerStyle}
    titleStyle={styles.titleStyle}
    fadeDirection="up"
    scrollViewProps={{showsVerticalScrollIndicator: false}}
    title="소개 입력">
    <View style={styles.blank} />
    <View style={styles.makeCount}>
      <View style={styles.countView}>
        <Text style={styles.countText}>1</Text>
      </View>
      <View style={styles.countLine} />
      <View style={styles.countView2}>
        <Text style={styles.countText}>2</Text>
      </View>
      <View style={styles.countLine} />
      <View style={styles.countView2}>
        <Text style={styles.countText}>3</Text>
      </View>
    </View>
    <View style={styles.blank} />
    <View style={styles.blank} />
    <Text style={styles.text1}>로고, 메인 사진</Text>

    <TouchableOpacity
      style={styles.MainPictureClick}
      onPress={props.pickMainPicture}>
      <Image
        style={styles.PhotoAddMainPicture}
        source={require('../../../images/photoAdd.png')}
      />

      {props.mainPictureLoading ? (
        <View style={styles.MainPictureImage}>
          <ActivityIndicator size="large" />
        </View>
      ) : props.clubMainPicture_high == null ||
        props.clubMainPicture_high === 'ul' ||
        props.clubMainPicture_high === '' ? (
        <View style={styles.MainPictureImage} />
      ) : (
        props.clubMainPicture_high && (
          <Image
            style={styles.MainPictureImage}
            source={{uri: props.clubMainPicture_high}}
          />
        )
      )}
    </TouchableOpacity>

    <View style={styles.logo}>
      <TouchableOpacity onPress={props.pickLogo} style={styles.logoClick}>
        <Image
          style={styles.photoAddLogo}
          source={require('../../../images/photoAdd.png')}
        />

        {props.logoLoading ? (
          <View style={styles.logoImage}>
            <ActivityIndicator size="large" />
          </View>
        ) : props.clubLogo_high == null ||
          props.clubLogo_high === 'ul' ||
          props.clubLogo_high === '' ? (
          <View style={styles.logoImage} />
        ) : (
          props.clubLogo_high && (
            <Image
              style={styles.logoImage}
              source={{uri: props.clubLogo_high}}
            />
          )
        )}
      </TouchableOpacity>
    </View>

    <View style={styles.containerFromClubName}>
      <View style={styles.block}>
        <Text
          style={[
            styles.text,
            {
              color: props.isFocused ? '#000000' : '#8d97a5',
            },
          ]}>
          모임 이름
        </Text>
        <TextInput
          onFocus={props.handleFocus}
          onBlur={props.clubName.length === 0 ? props.handleBlur : null}
          style={[
            styles.input,
            {
              borderColor: props.isFocused ? '#DCDCDC' : null,
              shadowColor: props.isFocused ? '#E1E1E1' : null, // IOS
              shadowOffset: props.isFocused ? {height: 1.5, width: 0} : null, // IOS
              shadowOpacity: props.isFocused ? 5 : null, // IOS
              shadowRadius: props.isFocused ? 3 : null, // IOS
              elevation: props.isFocused ? 1.5 : null, // IOS
            },
          ]}
          onChangeText={props.clubNameChange}
          maxLength={20}
          value={props.clubName}
          autoCorrect={false}
        />
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>모임 종류</Text>
        <View style={{width: height * 0.23}}>
          {props.navigation.getParam('from', 'NO-ID') == 'm' ? (
            <ClubPickerM
              clubKind={props.clubKind}
              setPrevClubKind={props.setPrevClubKind}
            />
          ) : (
            <ClubPicker setPrevClubKind={props.setPrevClubKind} />
          )}
        </View>
      </View>

      <View style={styles.blank} />
      <Text style={styles.text}>모임 성격</Text>
      <View style={styles.charView}>
        <Text style={styles.charLeftText}>소규모</Text>
        <Slider
          value={props.clubSize}
          onValueChange={props.clubSizeChange}
          style={{width: width * 0.6}}
          minimumTrackTintColor="#E5E5E5"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#ADCDE9"
          thumbStyle={{width: 15, height: 15, borderRadius: 3}}
          trackStyle={{height: 2}}
        />
        <Text style={styles.charRightText}>대규모</Text>
      </View>
      <View style={styles.charView}>
        <Text style={styles.charLeftText}>자율적인</Text>
        <Slider
          value={props.clubAutonomous}
          onValueChange={props.clubAutonomousChange}
          style={{width: width * 0.6}}
          minimumTrackTintColor="#E5E5E5"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#ADCDE9"
          thumbStyle={{width: 15, height: 15, borderRadius: 3}}
          trackStyle={{height: 2}}
        />
        <Text style={styles.charRightText}>체계적인</Text>
      </View>
      <View style={styles.charView}>
        <Text style={styles.charLeftText}>재미있는</Text>
        <Slider
          value={props.clubFunny}
          onValueChange={props.clubFunnyChange}
          style={{width: width * 0.6}}
          minimumTrackTintColor="#E5E5E5"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#ADCDE9"
          thumbStyle={{width: 15, height: 15, borderRadius: 3}}
          trackStyle={{height: 2}}
        />
        <Text style={styles.charRightText}>진지한</Text>
      </View>
      <View style={styles.charView}>
        <Text style={styles.charLeftText}>친목도모</Text>
        <Slider
          value={props.clubFriendship}
          onValueChange={props.clubFriendshipChange}
          style={{width: width * 0.6}}
          minimumTrackTintColor="#E5E5E5"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#ADCDE9"
          thumbStyle={{width: 15, height: 15, borderRadius: 3}}
          trackStyle={{height: 2}}
        />
        <Text style={styles.charRightText}>활동중심</Text>
      </View>

      <View style={styles.block} />

      <View style={styles.block}>
        <Text
          style={[
            styles.text,
            {
              color: props.isFocused1 ? '#000000' : '#8d97a5',
            },
          ]}>
          모임 소개
        </Text>

        <TextInput
          onFocus={props.handleFocus1}
          onBlur={props.clubIntroduce.length == 0 ? props.handleBlur1 : null}
          style={[
            styles.input,
            {
              height: height * 0.2,
              borderColor: props.isFocused1 ? '#DCDCDC' : null,
              shadowColor: props.isFocused1 ? '#E1E1E1' : null, // IOS
              shadowOffset: props.isFocused1 ? {height: 1.5, width: 0} : null, // IOS
              shadowOpacity: props.isFocused1 ? 5 : null, // IOS
              shadowRadius: props.isFocused1 ? 3 : null, // IOS
              elevation: props.isFocused1 ? 1.5 : null, // IOS
            },
          ]}
          multiline={true}
          onChangeText={props.clubIntroduceChange}
          maxLength={1000}
          autoCorrect={false}
          value={props.clubIntroduce}
        />
      </View>

      <View style={styles.block}>
        <Text
          style={[
            styles.text,
            {
              color: props.isFocused2 ? '#000000' : '#8d97a5',
            },
          ]}>
          연락처
        </Text>
        <TextInput
          onFocus={props.handleFocus2}
          onBlur={props.clubPhoneNumber.length == 0 ? props.handleBlur2 : null}
          style={[
            styles.input,
            {
              height: height * 0.13,
              borderColor: props.isFocused2 ? '#DCDCDC' : null,
              shadowColor: props.isFocused2 ? '#E1E1E1' : null, // IOS
              shadowOffset: props.isFocused2 ? {height: 1.5, width: 0} : null, // IOS
              shadowOpacity: props.isFocused2 ? 5 : null, // IOS
              shadowRadius: props.isFocused2 ? 3 : null, // IOS
              elevation: props.isFocused2 ? 1.5 : null, // IOS
            },
          ]}
          onChangeText={props.clubPhoneNumberChange}
          value={props.clubPhoneNumber}
          maxLength={1000}
          multiline={true}
          autoCorrect={false}
        />
      </View>
    </View>

    <View style={styles.button}>
      {props.clubName.length == 0 && props.clubPhoneNumber.length == 0 ? (
        <ConfirmButtonN
          buttonColor={'#CEE1F2'}
          titleColor={'#BBBBBB'}
          title={'확인'}
        />
      ) : props.isSubmitting ? (
        <ConfirmButton
          buttonColor={'#ADCDE9'}
          titleColor={'#3B3B3B'}
          title={'로딩'}
        />
      ) : (
        <ConfirmButton
          buttonColor={'#ADCDE9'}
          titleColor={'#3B3B3B'}
          title={'확인'}
          onPress={props.btnPress}
        />
      )}
    </View>
  </HeaderScrollView>
);

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: width * 0.2,
    height: height * 0.1,
    top: Platform.OS === 'ios' ? 30 : 15,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: height * 0.1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  MainPictureClick: {
    alignItems: 'center',
    marginTop: height * 0.007,
    marginHorizontal: width * 0.05,
  },
  PhotoAddMainPicture: {
    width: height * 0.052,
    height: height * 0.052,
    position: 'absolute',
    zIndex: 1,
    right: -height * 0.024,
    bottom: -height * 0.024,
  },

  warning: {
    top: -height * 0.2,
    textAlign: 'center',
    fontSize: height * 0.0215,
    color: '#C1D0DC',
    lineHeight: height * 0.035,
  },
  MainPictureImage: {
    marginTop: 5,
    width: width * 0.9,
    height: height * 0.23,
    borderRadius: height * 0.024,
    backgroundColor: '#CEE1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    top: -width * 0.07,
    zIndex: 1,
  },
  logoClick: {
    width: width * 0.27,
    height: width * 0.27,
    top: -width * 0.07,
    zIndex: 1,
    backgroundColor: '#ADCDE9',
    borderRadius: width * 0.27 * 0.5,
  },
  photoAddLogo: {
    width: height * 0.052,
    height: height * 0.052,
    position: 'absolute',
    zIndex: 1,
    right: -height * 0.007,
    bottom: -height * 0.007,
  },
  logoImage: {
    width: width * 0.27,
    height: width * 0.27,
    borderRadius: width * 0.27 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFromClubName: {
    paddingHorizontal: width * 0.05,
  },
  input: {
    borderRadius: height * 0.01,
    width: '100%',
    padding: height * 0.009,
    backgroundColor: 'white',
    fontSize: height * 0.021,
    marginTop: height * 0.007,
  },
  text: {
    fontSize: height * 0.021,
  },
  text1: {
    fontSize: height * 0.021,
    paddingHorizontal: width * 0.05,
  },
  block: {
    paddingBottom: height * 0.042,
  },
  button: {
    height: height * 0.09,
    marginTop: height * 0.042,
    paddingHorizontal: width * 0.03,
  },
  blank: {
    width: width,
    height: height * 0.03,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.112,
  },
  headerContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...ifIphoneX({paddingTop: 18}, {paddingTop: 0}),
    height: Platform.OS === 'ios' ? height * 0.1 : height * 0.08,
  },
  headlineStyle: {
    height: height * 0.1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
    paddingTop: Platform.OS === 'ios' ? height * 0.055 : height * 0.048,
  },
  headerComponentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
  },
  titleStyle: {
    // paddingTop: Platform.OS === 'ios' ? 15 : 0,
    color: '#3B3B3B',
    fontSize: width * 0.075,
  },
  makeCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07 * 0.5,
    backgroundColor: '#7B99B6',
  },
  countView2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07 * 0.5,
    backgroundColor: '#8D8D8D',
  },
  countText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  countLine: {
    backgroundColor: '#BBBBBB',
    height: 1,
    width: width * 0.25,
    marginHorizontal: 7,
  },
  charView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  charLeftText: {
    color: '#003964',
    width: width * 0.2,
    textAlign: 'center',
    fontSize: width * 0.035,
  },
  charRightText: {
    color: '#580000',
    width: width * 0.2,
    textAlign: 'center',
    fontSize: width * 0.035,
  },
});

export default MakeClub2;
