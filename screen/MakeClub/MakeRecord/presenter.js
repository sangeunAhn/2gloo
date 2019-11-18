import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Text,
} from 'react-native';
import RecordButtonN from '../../../components/Button/RecordButtonN';
import RecordButton from '../../../components/Button/RecordButton';
import HeaderScrollView from 'react-native-header-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';
import MasonryView from '../../../components/Photo/MasonryList';

const {width, height} = Dimensions.get('window');

const MakeRecord = props => (
  <>
    {props.isGetting ? (
      <>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <SafeAreaView>
            <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
          </SafeAreaView>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={props.iconPress}>
          <SafeAreaView>
            <Text
              style={{
                ...ifIphoneX({paddingTop: 5}, {paddingTop: 0}),
                fontSize: width * 0.05,
                color: '#3B3B3B',
                fontWeight: '600',
              }}>
              추가
            </Text>
          </SafeAreaView>
        </TouchableOpacity>
        <View style={styles.container}>
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
              paddingTop:
                Platform.OS === 'ios' ? height * 0.065 : height * 0.048,
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
            title="기록 생성">
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
                  backgroundColor: '#8D8D8D',
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
                  backgroundColor: '#7B99B6',
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

            {props.count >= 1 ? (
              <>
                <MasonryView {...props} from={'update'} />
              </>
            ) : (
              <>
                <View
                  style={{
                    width: width,
                    paddingTop: height * 0.01,
                    height: height * 0.6,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: width * 0.035,
                      color: '#BBBBBB',
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    이용자들에게 보여줄 여러분들의 활동 사진들을 올려주세요.
                    {'\n'}
                    (없으시면 나중에 올리셔도 됩니다.)
                  </Text>
                </View>
              </>
            )}
          </HeaderScrollView>

          {/* 완료버튼 */}
          <View style={styles.footer}>
            <RecordButton onPress={props.btnPress} />
          </View>
        </View>
      </>
    ) : (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  backBtn: {
    position: 'absolute',
    width: width * 0.2,
    height: height * 0.07,
    top: Platform.OS === 'ios' ? 30 : 15,
    left: 10,
    zIndex: 1,
    //   backgroundColor: 'blue'
  },
  addBtn: {
    position: 'absolute',
    width: width * 0.25,
    height: height * 0.07,
    top: Platform.OS === 'ios' ? 32 : 15,
    right: 10,
    zIndex: 1,
    fontSize: width * 0.05,
    alignItems: 'flex-end',
    //   backgroundColor: 'blue'
  },
  header: {
    paddingTop: 23,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  content: {
    flex: 1,
  },
  footer: {
    height: height * 0.09,
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  button: {
    backgroundColor: '#0064FF',
    width: 50,
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 50,
  },
  text: {
    fontSize: 25,
    color: '#fff',
  },
  loading: {
    width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MakeRecord;