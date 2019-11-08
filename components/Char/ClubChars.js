import React, {Component} from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import {moderateScale} from '../Scaling';

export default class ClubChars extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Text style={[styles.text, {fontSize: this.props.fontSize}]}>#{this.props.chars} </Text>;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Platform.OS === 'ios' ? moderateScale(11) : moderateScale(10),
    textAlignVertical: 'center',
    color: '#BBBBBB',
  },
});
