import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import ConfirmButton from '../../../components/Button/ConfirmButton';
import ConfirmButtonN from '../../../components/Button/ConfirmButtonN';
import CharInput from '../../../components/Char/CharInput';
import Char from '../../../components/Char/Char';
import CharEX from '../../../components/Char/CharEX';
import HeaderScrollView from 'react-native-header-scroll-view';
import {moderateScale} from '../../../components/Scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

const MakeChars = props => (
  <>
    <TouchableWithoutFeedback onPress={props.screenPress}>
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
            fontSize: width * 0.075,
          }}
          fadeDirection="up"
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          title="특징 입력">
          <View style={{flex: 1}}>
            <View
              style={{
                marginTop: height * 0.05,
                marginBottom: height * 0.02,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width * 0.07,
                  height: width * 0.07,
                  borderRadius: width * 0.07 * 0.5,
                  backgroundColor: '#8D8D8D',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  1
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#BBBBBB',
                  height: 1,
                  width: width * 0.25,
                  marginHorizontal: 7,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width * 0.07,
                  height: width * 0.07,
                  borderRadius: width * 0.07 * 0.5,
                  backgroundColor: '#7B99B6',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  2
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#BBBBBB',
                  height: 1,
                  width: width * 0.25,
                  marginHorizontal: 7,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width * 0.07,
                  height: width * 0.07,
                  borderRadius: width * 0.07 * 0.5,
                  backgroundColor: '#8D8D8D',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  3
                </Text>
              </View>
            </View>
            {props.count >= 8 ? (
              <View style={{height: '5%'}} />
            ) : (
              <CharInput addChar={props.addChar} />
            )}
          </View>

          <View style={styles.contain}>
            {props.count == 0 ? (
              <>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.ex}>
                    {' '}
                    예시)
                    {'\n'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                    }}>
                    <CharEX title="#소규모" />
                    <CharEX title="#꿀잼" />
                    <CharEX title="#잘생긴놈들" />
                    <CharEX title="#아싸들의 성지" />
                    <CharEX title="#페북/인스타 운영" />
                    <CharEX title="#친근함" />
                    <CharEX title="#대규모" />
                    <CharEX title="#매주 여행" />
                  </View>
                </View>
              </>
            ) : (
              <ScrollView style={{flex:1}}>
              <View style={styles.chars}>
                {Object.values(props.chars).map(data => (
                  <Char
                    key={data.id}
                    text={data.char}
                    removeChar={props.removeChar}
                    delBtn={data.delBtn}
                    {...data}
                  />
                ))}
              </View>
              </ScrollView>
            )}
          </View>
          <View style={{height: 80}} />
        </HeaderScrollView>

        {/* 완료버튼 */}
        <View style={styles.footer}>
          {props.count == 0 ? (
            <ConfirmButtonN title={'선택완료'} />
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
              title={'선택완료'}
              onPress={props.buttonPress}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  header: {
    width: '100%',
    paddingTop: 20,
  },
  ex: {
    fontSize: moderateScale(12),
    color: '#BBBBBB',
    marginBottom: 10,
  },
  chars: {
    width: '100%',
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  footer: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
  },
  contain: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default MakeChars;
