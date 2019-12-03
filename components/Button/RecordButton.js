import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default class RecordTrue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <LinearGradient colors={['#CBDFF1', '#8DB5D6']} style={styles.button}>
          <Text style={styles.title}>완료</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    borderRadius: 15,
    backgroundColor: '#ADCDE9',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowColor: '#E1E1E1', // IOS
    shadowOffset: {height: 3, width: 1}, // IOS
    shadowOpacity: 3, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#3B3B3B',
  },
});
