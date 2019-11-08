import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import ClubView from '../ClubView';

const {width, height} = Dimensions.get('window');

const ClubDiv = props => (
  <View style={styles.container}>
    {props.clubNo.map((name, i) => {
      return (
        <ClubView
          clubNo={props.clubNo[i]}
          clubName={props.clubName[i]}
          clubLogo={props.clubLogo[i]}
          clubMainPicture={props.clubMainPicture[i]}
          school={props.school}
          key={i}
          navigation={props.navigation}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: height * 0.01,
    backgroundColor: '#FAFAFA',
  },
  menuTitle: {
    paddingTop: height * 0.015,
    fontWeight: 'bold',
    color: '#ADCDE9',
    fontSize: height * 0.03,
  },
  line: {
    borderBottomWidth: height * 0.001,
    borderColor: '#ADCDE9',
    width: '85%',
    alignItems: 'flex-end',
  },
});

export default ClubDiv;
