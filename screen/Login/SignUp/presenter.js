import React, {Component} from 'react';
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
  SafeAreaView,
} from 'react-native';
import ConfirmButton from '../../../components/Button/ConfirmButton';
import ConfirmButtonN from '../../../components/Button/ConfirmButtonN';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderScrollView from 'react-native-header-scroll-view';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';
import DatePicker from 'react-native-datepicker';
import {CheckBox} from 'react-native-elements';
import SchoolPicker from '../../../components/SignUp/SchoolPicker';

const {width, height} = Dimensions.get('window');

const SignUp = props => (
  <>
    {props.isGetting == false &&
    props.navigation.getParam('from', 'NO-ID') == 'm' ? (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    ) : (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <SafeAreaView>
            <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
          </SafeAreaView>
        </TouchableOpacity>
        <HeaderScrollView
          headerContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            ...ifIphoneX({paddingTop: 18}, {paddingTop: 0}),
            height: Platform.OS === 'ios' ? height * 0.1 : height * 0.08,
          }}
          headlineStyle={{
            height: height * 0.1,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            fontSize: width * 0.05,
            paddingTop: Platform.OS === 'ios' ? height * 0.055 : height * 0.048,
          }}
          headerComponentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.08,
          }}
          titleStyle={{
            // paddingTop: Platform.OS === 'ios' ? 15 : 0,
            color: '#3B3B3B',
            fontSize: width * 0.09,
          }}
          fadeDirection="up"
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          title="회원가입">
          <View style={styles.blank} />

          <View style={styles.containerFromClubName}>
            <View style={styles.block}>
              <Text
                style={[
                  styles.text,
                  {
                    color: props.isFocused ? '#000000' : '#8d97a5',
                  },
                ]}>
                ID
              </Text>
              <TextInput
                onFocus={props.handleFocus}
                onBlur={props.id.length == 0 ? props.handleBlur : null}
                style={[
                  styles.input,
                  {
                    borderColor: props.isFocused ? '#DCDCDC' : null,
                    shadowColor: props.isFocused ? '#E1E1E1' : null, // IOS
                    shadowOffset: props.isFocused
                      ? {height: 1.5, width: 0}
                      : null, // IOS
                    shadowOpacity: props.isFocused ? 5 : null, // IOS
                    shadowRadius: props.isFocused ? 3 : null, // IOS
                    elevation: props.isFocused ? 1.5 : null, // IOS
                  },
                ]}
                onChangeText={props.idChange}
                maxLength={20}
                value={props.id}
                autoCorrect={false}
                autoCapitalize={'none'}
              />
            </View>

            <View style={styles.block}>
              <Text
                style={[
                  styles.text,
                  {
                    color: props.isFocused1 ? '#000000' : '#8d97a5',
                  },
                ]}>
                비밀번호
              </Text>
              <TextInput
                secureTextEntry={true}
                onFocus={props.handleFocus1}
                onBlur={props.password.length == 0 ? props.handleBlur1 : null}
                style={[
                  styles.input,
                  {
                    borderColor: props.isFocused1 ? '#DCDCDC' : null,
                    shadowColor: props.isFocused1 ? '#E1E1E1' : null, // IOS
                    shadowOffset: props.isFocused1
                      ? {height: 1.5, width: 0}
                      : null, // IOS
                    shadowOpacity: props.isFocused1 ? 5 : null, // IOS
                    shadowRadius: props.isFocused1 ? 3 : null, // IOS
                    elevation: props.isFocused1 ? 1.5 : null, // IOS
                  },
                ]}
                onChangeText={props.pwChange}
                maxLength={20}
                value={props.password}
                autoCorrect={false}
                autoCapitalize={'none'}
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
                비밀번호 확인
              </Text>
              <TextInput
                secureTextEntry={true}
                onFocus={props.handleFocus2}
                onBlur={props.password2.length == 0 ? props.handleBlur2 : null}
                style={[
                  styles.input,
                  {
                    borderColor: props.isFocused2 ? '#DCDCDC' : null,
                    shadowColor: props.isFocused2 ? '#E1E1E1' : null, // IOS
                    shadowOffset: props.isFocused2
                      ? {height: 1.5, width: 0}
                      : null, // IOS
                    shadowOpacity: props.isFocused2 ? 5 : null, // IOS
                    shadowRadius: props.isFocused2 ? 3 : null, // IOS
                    elevation: props.isFocused2 ? 1.5 : null, // IOS
                  },
                ]}
                onChangeText={props.pw2Change}
                maxLength={20}
                value={props.password2}
                autoCorrect={false}
                autoCapitalize={'none'}
              />
            </View>

            <View style={styles.block}>
              <Text
                style={[
                  styles.text,
                  {
                    color: props.isFocused3 ? '#000000' : '#8d97a5',
                  },
                ]}>
                이메일
              </Text>
              <TextInput
                onFocus={props.handleFocus3}
                onBlur={props.email.length == 0 ? props.handleBlur3 : null}
                style={[
                  styles.input,
                  {
                    borderColor: props.isFocused3 ? '#DCDCDC' : null,
                    shadowColor: props.isFocused3 ? '#E1E1E1' : null, // IOS
                    shadowOffset: props.isFocused3
                      ? {height: 1.5, width: 0}
                      : null, // IOS
                    shadowOpacity: props.isFocused3 ? 5 : null, // IOS
                    shadowRadius: props.isFocused3 ? 3 : null, // IOS
                    elevation: props.isFocused3 ? 1.5 : null, // IOS
                  },
                ]}
                onChangeText={props.emailChange}
                maxLength={40}
                value={props.email}
                autoCorrect={false}
                autoCapitalize={'none'}
              />
            </View>

            <View style={styles.block}>
              <Text
                style={[
                  styles.text,
                  {
                    color: props.isFocused ? '#000000' : '#8d97a5',
                  },
                ]}>
                대학교
              </Text>
              <View style={styles.schoolPicker}>
                <SchoolPicker schoolChange={props.schoolChange} />
              </View>
            </View>
          </View>

          <View style={styles.button}>
            {props.id == '' ||
            props.password == '' ||
            props.password2 == '' ||
            props.email == '' ? (
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
      </View>
    )}
  </>
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
  Picture: {
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
  pictureImage: {
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
  schoolPicker: {
    width: width * 0.5,
    // backgroundColor: 'blue',
    top: -20,
  },
});

export default SignUp;
