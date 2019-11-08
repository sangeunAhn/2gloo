import React, {Component} from 'react';
import {Alert} from 'react-native';
import * as axios from 'axios';
import SignUpPermission from './presenter';

class Container extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      value1: false,
      value2: false,
    };
  }

  render() {
    return (
      <SignUpPermission
        {...this.props}
        {...this.state}
        agree1={this._agree1}
        agree2={this._agree2}
        onPress={this._onPress}
      />
    );
  }

  _onPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  _agree1 = () => {
    const {value1} = this.state;
    if (value1 == true) {
      this.setState({value1: false});
    } else {
      this.setState({value1: true});
    }
  };
  _agree2 = () => {
    const {value2} = this.state;
    if (value2 == true) {
      this.setState({value2: false});
    } else {
      this.setState({value2: true});
    }
  };
}

export default Container;
