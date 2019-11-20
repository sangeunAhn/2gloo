import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import ClubChars from '../../Char/ClubChars';
import {moderateScale} from '../../Scaling';
import TouchMainPicture from '../TouchMainPicture';
import FastImage from 'react-native-fast-image';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

const {width, height} = Dimensions.get('window');

const ClubView = props => (
  <TouchableWithoutFeedback
    onPress={props.gotoClubIntroduce}
    style={{marginHorizontal: 8}}>
    <Card style={{borderRadius: 15}}>
      <CardItem
        cardBody
        bordered
        style={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
        {props.clubMainPicture === null ||
        props.clubMainPicture === 'ul' ||
        props.clubMainPicture == '' ? (
          <View style={styles.mainPicture} />
        ) : (
          <FastImage
            source={{uri: props.clubMainPicture}}
            style={styles.mainPicture}
          />
        )}
      </CardItem>
      <CardItem
        cardFooter
        bordered
        style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
        <Left>
          {props.clubLogo === null ||
          props.clubLogo === 'ul' ||
          props.clubLogo == '' ? (
            <View style={{width: 40, height: 40}} />
          ) : (
            <Thumbnail
              style={{width: 40, height: 40, elevation:5}}
              source={{uri: props.clubLogo}}
            />
          )}

          <Body style={{flexWrap: 'nowrap'}}>
            <Text style={{fontSize: 20, marginBottom: 3}}>
              {props.clubName}
            </Text>
            <Text style={{fontSize: 12}}>
              {' '}
              {props.clubChar.map((char, i) => {
                return <ClubChars color={'#8D8D8D'}chars={char} key={i} />;
              })}
            </Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  </TouchableWithoutFeedback>

);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.35,
    backgroundColor: '#FAFAFA',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: height * 0.027,
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  clubViewTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: height * 0.083,
    height: height * 0.083,
    borderRadius: height * 0.083 * 0.5,
    marginRight: height * 0.021,
    shadowColor: '#888888', // IOS
    shadowOffset: {height: 0, width: 0}, // IOS
    shadowOpacity: 15, // IOS
    shadowRadius: 5, //IOS
    elevation: 10, // Android
  },
  Image: {
    width: height * 0.083,
    height: height * 0.083,
    borderRadius: height * 0.083 * 0.5,
  },
  club: {
    flex: 1,
    // textAlignVertical: 'center',

    height: height * 0.1,
    // backgroundColor: '#DCEBFF',
  },
  clubTitle: {
    // flex: 1,
    justifyContent: 'flex-start',
    marginBottom: height * 0.005,
    // textAlignVertical: 'center',
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: '#3B3B3B',
    // backgroundColor: 'red',
  },
  clubChar: {
    // flex: 1.7,
    // textAlignVertical: "center",
    marginLeft: height * 0.008,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    // fontSize: Platform.OS === 'ios' ?  moderateScale(12) : moderateScale(10) ,
    color: '#BBBBBB',
    paddingBottom: height * 0.008,
    marginBottom: -height * 0.008,
    lineHeight: Platform.OS === 'ios' ? height * 0.025 : height * 0.022,
    // backgroundColor: 'green',
  },
  button: {
    top: -height * 0.064,
    margin: height * 0.048,
    height: height * 0.096,
    width: height * 0.08,
    zIndex: 999,
  },
  shadow: {
    marginTop: height * 0.016,
    borderRadius: height * 0.02,

    width: width * 0.95,
    height: height * 0.24,
    shadowColor: '#B8B8B8', // IOS
    shadowOffset: {height: height * 0.008, width: 1}, // IOS
    shadowOpacity: height * 0.011, // IOS
    shadowRadius: height * 0.007, //IOS
    elevation: height * 0.008, // Android
    backgroundColor: 'white',
  },
  picture: {
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    backgroundColor: '#CEE1F2',
    borderRadius: height * 0.019,

    width: width * 0.95,
    height: height * 0.245,
  },
  picture2: {
    zIndex: 0,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    borderRadius: height * 0.019,
    width: width * 0.95,
    height: height * 0.245,
  },
  mainPicture: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 180,
    width: null,
    flex: 1,
  },
});

export default ClubView;
