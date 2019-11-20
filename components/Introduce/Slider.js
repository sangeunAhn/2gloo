import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import {Slider} from 'react-native-elements';

const {height, width} = Dimensions.get('window');

export default class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      onLoad: false,
    };
  }

  render() {
    return (
      <View style={styles.sliderBlock}>
        <Text style={styles.sliderTextL}>{this.props.textL}</Text>
        <Slider
          disabled={true}
          value={
            this.props.textL === '소규모'
              ? this.props.clubSize
              : this.props.textL === '자율적인'
              ? this.props.clubAutonomous
              : this.props.textL === '재미있는'
              ? this.props.clubFunny
              : this.props.clubFriendship
          }
          style={{width: width * 0.55}}
          minimumTrackTintColor="#A9DFE2"
          maximumTrackTintColor="#D1D5FA"
          thumbTintColor="white"
          thumbStyle={styles.slider}
          trackStyle={{height: 4}}
        />
        <Text style={styles.sliderTextR}>{this.props.textR}</Text>
      </View>
    );
  }

  _onLoad = () => {
    this.setState(() => ({onLoad: true}));
  };
}

const styles = StyleSheet.create({
  sliderBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: height * 0.02,
  },
  sliderTextL: {
    color: '#003964',
    width: width * 0.2,
    textAlign: 'center',
    fontSize: 12,
  },
  slider: {
    borderWidth: 3.5,
    borderColor: '#ADCDE9',
    width: 18,
    height: 18,
    borderRadius: 18 * 0.5,
    elevation:3,
    shadowColor: '#bdc3c7',
		shadowOffset: {height: 4, width: 0},
		shadowOpacity: 5,
		shadowRadius: 5,
  },
  sliderTextR: {
    color: '#580000',
    width: width * 0.2,
    textAlign: 'center',
    fontSize: 12,
  },
});
