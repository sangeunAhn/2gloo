import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

const {width, height} = Dimensions.get('window');

export default class ClubChars extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.image}>
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.bottom}>
          <Text style={styles.text}>간단한 코멘트를 입력해주세요</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: 400,
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#E1E1E1',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  activityIndicator: {
    marginTop: 150,
    marginBottom: 120,
  },
  line: {
    width: '75%',
    height: 1,
    backgroundColor: '#dfe4ea',
  },
  bottom: {
    height: height * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 19,
    color: '#bebebe',
  },
});
