import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import UpdateClubBtnText from './UpdateClubBtnText';

const {width, height} = Dimensions.get('window');

export default class UpdateButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.shadow}>
        <TouchableOpacity onPress={this.props.press}>
          <View style={styles.box1}>
            <View style={styles.box2}>
              <View style={styles.box3}>
                <View
                  style={
                    this.props.title === '정보 수정' ||
                    this.props.title === '계정 수정'
                      ? styles.logo
                      : styles.logo2
                  }>
                  {this.props.title === '정보 수정' ? (
                    <EvilIcons name="user" size={width * 0.1} />
                  ) : this.props.title === '특징 수정' ? (
                    <AntDesign name="idcard" size={width * 0.075} />
                  ) : (
                    <SimpleLineIcons
                      name="social-instagram"
                      size={width * 0.07}
                    />
                  )}
                </View>
                <UpdateClubBtnText
                  title={this.props.title}
                  sub={this.props.sub}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box1: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  shadow: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2,
  },
  box2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box3: {
    flexDirection: 'row',
  },
  logo: {
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    marginRight: width * 0.055,
  },
  logo2: {
    marginHorizontal: width * 0.07,
    justifyContent: 'center',
    marginRight: width * 0.065,
  },
});
