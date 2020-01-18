import React from 'react';
import {StyleSheet, View, Dimensions, Text, Image, Linking} from 'react-native';
import {Fonts} from '../../../src/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

const Home = props => (
  <>
    <Swiper
      paginationStyle={{bottom: Platform.OS === 'ios' ? 15 : 10}}
      loop={false}
      showsButtons
      nextButton={
        <View style={styles.rightArrow}>
          <View style={styles.up1} />
          <View style={styles.down1} />
        </View>
      }
      prevButton={
        <View style={styles.leftArrow}>
          <View style={styles.up2} />
          <View style={styles.down2} />
        </View>
      }
      >
      <View style={styles.container}>
        <Text style={[styles.title, styles.text, {fontSize: 60, marginBottom: 30}]}>우리학교</Text>
        <Text style={[styles.title, styles.text, {fontSize: 70}]}>모임</Text>
        <View style={styles.enterBtn}>
          <TouchableOpacity onPress={props.enterBtnPress1}>
            <Text style={[styles.text, {fontSize: 20, padding: 5}]}>들어가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.schoolBtn}>
          <TouchableOpacity onPress={props.schoolBtnPress1}>
            <Text style={[styles.text, {fontSize: 16, color: '#7f8c8d', padding: 5}]}>학교선택</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inquireBtn}>
          <TouchableOpacity onPress={props.openModal}>
            <Text style={{color: '#7f8c8d'}}>문의하기</Text>
          </TouchableOpacity>
        </View>
        <Modal
          modalDidOpen={props.modalDidOpen}
          modalDidClose={props.modalDidClose}
          open={props.open}
          closeOnTouchOutside={true}
          modalStyle={{
            borderRadius: 20,
            margin: 50,
            padding: 10,
            backgroundColor: '#F5F5F5',
          }}>
          <View style={{marginTop: 10, marginBottom: 15, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              무엇이든 문의해주세요 :)
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 5, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
              }>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../images/kakaoLogo.png')}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: width * 0.03, marginBottom: 5}}
              onPress={() =>
                Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
              }>
              1:1 문의하기
            </Text>
          </View>
          <Text
            style={{
              color: '#848484',
              fontSize: width * 0.02,
              textAlign: 'center',
            }}>
            미래의 배우자까지 알려드립니다. {'\n'}단, 책임지지 않습니다
          </Text>
        </Modal>
      </View>
      <View style={styles.container}>
        <Text style={[styles.title, styles.text, {fontSize: 60, marginBottom: 30}]}>우리학교</Text>
        <Text style={[styles.title, styles.text, {fontSize: 70}]}>게시판</Text>
        <View style={styles.enterBtn}>
          <TouchableOpacity onPress={props.enterBtnPress2}>
            <Text style={[styles.text, {fontSize: 20, padding: 5}]}>들어가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.schoolBtn}>
          <TouchableOpacity onPress={props.schoolBtnPress2}>
            <Text style={[styles.text, {fontSize: 16, color: '#7f8c8d', padding: 5, zIndex:2}]}>학교선택</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inquireBtn}>
          <TouchableOpacity onPress={props.openModal}>
            <Text style={{color: '#7f8c8d'}}>문의하기</Text>
          </TouchableOpacity>
        </View>
        <Modal
          modalDidOpen={props.modalDidOpen}
          modalDidClose={props.modalDidClose}
          open={props.open}
          closeOnTouchOutside={true}
          modalStyle={{
            borderRadius: 20,
            margin: 50,
            padding: 10,
            backgroundColor: '#F5F5F5',
          }}>
          <View style={{marginTop: 10, marginBottom: 15, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              무엇이든 문의해주세요 :)
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 5, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
              }>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../images/kakaoLogo.png')}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: width * 0.03, marginBottom: 5}}
              onPress={() =>
                Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
              }>
              1:1 문의하기
            </Text>
          </View>
          <Text
            style={{
              color: '#848484',
              fontSize: width * 0.02,
              textAlign: 'center',
            }}>
            미래의 배우자까지 알려드립니다. {'\n'}단, 책임지지 않습니다
          </Text>
        </Modal>
      </View>
    </Swiper>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  title: {
    top: height * 0.35,
  },
  enterBtn: {
    top: height * 0.55,
    marginBottom: 20
  },
  schoolBtn: {
    top: height * 0.55,
  },
  inquireBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  text: {
    fontFamily: 'BMDOHYEON'
  },
  buttonText: {
    fontSize: 40
  },
  rightArrow: {
    width: 30,
    height: 70,
  },
  up1: {
    backgroundColor: '#7f8c8d',
    width: 30,
    height: 1.5,
    transform: [{ rotate: '60deg'}]
  },
  down1: {
    backgroundColor: '#7f8c8d',
    width: 30,
    height: 1.5,
    top: 24,
    transform: [{ rotate: '120deg'}]
  },
  leftArrow: {
    width: 30,
    height: 70,
    // backgroundColor: 'red',
    alignItems: 'flex-end'
  },
  up2: {
    backgroundColor: '#7f8c8d',
    width: 30,
    height: 1.5,
    transform: [{ rotate: '120deg'}]
  },
  down2: {
    backgroundColor: '#7f8c8d',
    width: 30,
    height: 1.5,
    top: 24,
    transform: [{ rotate: '60deg'}]
  }
});
// module.exports = Schools;
export default Home;
