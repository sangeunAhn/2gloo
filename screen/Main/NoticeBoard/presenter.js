import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Platform,
  Linking,
  Button,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import BackButton from '../../../components/Button/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const UpdateClub = props => (
  <>
    {props.isLoading ? (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    ) : (
      <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <BackButton navigation={props.navigation} />
        <View style={styles.title}>
          <SafeAreaView>
            <Text style={styles.titleText}>게시판</Text>
          </SafeAreaView>
        </View>

        <View style={{height: 40}} />
        <View
          style={{
            flex: 1,
            padding: 15,
            paddingTop: Platform.OS === 'ios' ? 50 : 35,
            paddingBottom: 30,
          }}>
          {props.swipedAll === false ? (
            <Swiper
              ref={swiper => {
                this.swiper = swiper;
              }}
              cards={props.images}
              renderCard={props.renderCard}
              stackSize={3}
              swipeBackCard
              onSwipedAll={props.onSwipedAll}>
              <View
                style={{
                  position: 'absolute',
                  width: width,
                  height: 50,
                  left: 0,
                  bottom: 0,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  zIndex: 99,
                }}>
                <TouchableOpacity onPress={() => this.swiper.swipeBack()}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#7f8c8d',
                    }}>
                    되돌리기
                  </Text>
                </TouchableOpacity>
              </View>
            </Swiper>
          ) : (
            <View style={styles.resetButtonView}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={props.reset}>
                <Text style={styles.resetText}>다시보기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    width: width,
    height: 40,
    top: Platform.OS === 'ios' ? 30 : 15,
    zIndex: 1,
    // backgroundColor: 'red',
  },
  titleText: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    zIndex: 1,
    top: height > 800 ? 8 : 6,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonView: {
    position: 'absolute',
    width: width,
    height: height,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  resetButton: {
    padding: 20,
    // backgroundColor: 'red',
  },
  resetText: {
    color: '#95a5a6',
    fontSize: 30,
  },
});

export default UpdateClub;
