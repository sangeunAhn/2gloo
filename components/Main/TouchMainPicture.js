import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export default class TouchMainPicture extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <View style={{zIndex: 0}}>
          {this.props.clubMainPicture === null ? (
            <View style={styles.picture} backgroundColor={'#CEE1F2'} />
          ) : (
            <View style={styles.picture}>
              <FastImage
                style={styles.picture2}
                source={{uri: this.props.clubMainPicture}}
              />
            </View>
          )}
        </View>
        {this.props.disabled == true ? null : (
          <>
            <View style={styles.black} />
            <View style={styles.popup}>
              <View style={styles.inPopup}>
                <View style={styles.logo}>
                  {this.props.clubLogo === null ? (
                    <View style={styles.Image} backgroundColor={'#ADCDE9'} />
                  ) : (
                    <FastImage
                      style={styles.Image}
                      source={{uri: this.props.clubLogo}}
                    />
                  )}
                </View>

                <TouchableOpacity
                  onPress={this.props.gotoClubIntroduce}
                  style={{flex: 1}}>
                  <View style={styles.clickArea}>
                    <Text style={styles.text}>소개</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.props.gotoRecord}
                  style={{flex: 1}}>
                  <View style={styles.clickArea}>
                    <Text style={styles.text}>기록</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  black: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 20,
  },
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    // backgroundColor:'white',
    zIndex: 20,
  },
  inPopup: {
    width: width * 0.5,
    height: height * 0.085,
    backgroundColor: 'white',
    borderRadius: height * 0.08,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: width * 0.02,
  },
  logo: {
    // margin: width * 0.05,
    // width: height*0.053,
    // height: height*0.053,
    flex: 1,
    borderRadius: height * 0.053 * 0.5,
    shadowColor: '#888888', // IOS
    shadowOffset: {height: 0, width: 0}, // IOS
    shadowOpacity: height * 0.024, // IOS
    shadowRadius: height * 0.008, //IOS
    // marginLeft: width*0.05,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  clickArea: {
    height: height * 0.1,
    justifyContent: 'center',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: height * 0.053,
    height: height * 0.053,
    borderRadius: height * 0.053 * 0.5,
  },
  picture: {
    zIndex: 0,

    borderRadius: 13,
    width: width * 0.95,
    height: height * 0.245,
  },
  picture2: {
    zIndex: 0,
    borderRadius: 13,
    width: width * 0.95,
    height: height * 0.245,
  },
  text: {
    fontSize: width * 0.037,
    fontWeight: '400',
  },
});
