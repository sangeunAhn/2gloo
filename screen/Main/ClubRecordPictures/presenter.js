import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import Picture from '../../../components/Photo/Picture';
import HeaderScrollView from 'react-native-header-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

const ClubRecordPictures = props => (
  <>
    {props.isGetting ? (
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
          title="기록 사진"
          scrollViewProps={{showsVerticalScrollIndicator: false}}>
          {Object.values(props.getDatas).map(image => (
            <Picture
              key={image.createdAt}
              picture={image.recordPicture_high}
              text={image.recordContent}
            />
          ))}
        </HeaderScrollView>
      </View>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  title: {
    fontSize: 23,
    color: '#fff',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default ClubRecordPictures;
