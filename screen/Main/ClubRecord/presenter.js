import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderScrollView from 'react-native-header-scroll-view';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import MasonryView from '../../../components/Photo/MasonryList';

const {width, height} = Dimensions.get('window');

const ClubRecord = props => (
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
        <View style={styles.container}>
          <HeaderScrollView
            containerStyle={{backgroundColor: '#FAFAFA'}}
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
                Platform.OS === 'ios' ? height * 0.055 : height * 0.048,
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
            title="기록">
            {/* {props.isGetting ? (
          <MasonryList
            backgroundColor="#FAFAFA"
            imageContainerStyle={{borderRadius: 6, marginBottom: 9}}
            spacing={2}
            images={props.listRecords}
            onPressImage={(item, index) => {
              props.goToPictures(item.uri);
            }}
            customImageComponent={FastImage}
            sorted={true}
          />
        ) : (
          <ActivityIndicator size="large" style={styles.activityIndicator} />
        )} */}
            {props.imageRoom.length === 0 ? (
              <>
                <View style={styles.noImageView}>
                  <Text style={styles.noImageText}>활동 사진이 없습니다.</Text>
                </View>
              </>
            ) : (
              <MasonryView {...props} />
            )}
          </HeaderScrollView>
        </View>
      </View>
    ) : (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
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
    width: '100%',
    height: 70,
    // backgroundColor:'#A0AFFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
  },
  footer: {
    width: '100%',
    height: 70,
    // backgroundColor: '#5CEEE6',
    borderTopWidth: 1,
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  noImageView: {
    width: width,
    paddingTop: height * 0.01,
    height: height * 0.6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  noImageText: {
    fontSize: width * 0.035,
    color: '#BBBBBB',
    textAlign: 'center',
    alignSelf: 'center',
  },
  loading: {
    width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClubRecord;
