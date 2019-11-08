import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get("window");

export default class ConfirmButtonN extends Component{
  static defaultProps = {
    buttonColor: '#ADCDE9',
    titleColor: '#fff',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity 
      disabled={true}
      style={[styles.button,{backgroundColor: this.props.buttonColor}]}
      onPress={this.props.onPress}>

        <Text style={[styles.title, {color: this.props.titleColor}]}>
          {this.props.title}
        </Text>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height*0.01,
    borderRadius: 15,
    height: height*0.07,
    opacity: 0.3,
    shadowColor: '#E1E1E1', // IOS
    shadowOffset: { height: 3, width: 1 }, // IOS
    shadowOpacity: 3, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Androidd 
  },
  title: {
    fontSize: width*0.052,
    fontWeight: "700"
  },
});