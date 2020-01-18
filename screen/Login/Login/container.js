import React, {useState} from 'react';
import {Alert, Animated} from 'react-native';
import * as axios from 'axios';
import Login from './presenter';
import AsyncStorage from '@react-native-community/async-storage';

class Container extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      value: new Animated.Value(0),
      position: new Animated.ValueXY({x: 0, y: 400}),
      open1: false,
      open2: false,
    };
  }
  componentDidMount() {
    this._moveX();
    this._retrieveData();
  }

  render() {
    return (
      <Login
        {...this.props}
        {...this.state}
        login={this._login}
        fadeIn={this._fadeIn}
        getStyle={this._getStyle}
        moveX={this._moveX}
        openModal1={this._openModal1}
        closeModal1={this._closeModal1}
        modalDidClose1={this._modalDidClose1}
        modalDidClose2={this._modalDidClose2}
        closeModal2={this._closeModal2}
        openModal2={this._openModal2}
      />
    );
  }

  _openModal1 = () => this.setState({open1: true});

  _closeModal1 = () => this.setState({open1: false});
  _modalDidClose1 = () => {
    this.setState({open1: false});
    console.log('Modal did close.');
  };

  _openModal2 = () => this.setState({open2: true});

  _closeModal2 = () => this.setState({open2: false});
  _modalDidClose2 = () => {
    this.setState({open2: false});
    console.log('Modal did close.');
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        console.log('스토리지에 있는 데이터 =', value);
        this.props.navigation.navigate('Home', {
          userId: value,
        });
      }
    } catch (error) {
      console.log('스토리지에 데이터가 없습니다.');
    }
  };

  _moveX = () => {
    Animated.decay(this.state.position, {
      toValue: {x: 0, y: 1},
      velocity: 0.1,
      // deceleration : 0.1
    }).start();
  };

  _getStyle = () => {
    return {
      transform: [{translateY: this.state.position.y}],
    };
  };

}

export default Container;
