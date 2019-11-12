import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Transition } from 'react-navigation-fluid-transitions';

const {height, width} = Dimensions.get('window');

export default class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      onLoad: false,
    };
  }

  componentWillMount = () => {
    Image.getSize(this.props.picture, (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const getHeight = (height * screenWidth - 22) / width;
      this.setState({height: getHeight});
    });
  };

  render() {
    return (
      <>
      
        <View style={styles.container}>
          <View style={[styles.imageView, {height: this.state.height}]}>
          <Transition shared={this.props.picture}>
            <FastImage
              style={{
                width: width - 22,
                height: this.state.height,
              }}
              source={{uri: this.props.picture}}
              onLoad={this._onLoad}
            />
            </Transition>
          </View>
          {!this.state.onLoad && (
            <View style={[styles.imageView]}>
              <ActivityIndicator size="large" />
            </View>
          )}
          <View style={styles.bottom}>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </View>
        
      </>
      
    );
  }

  _onLoad = () => {
    this.setState(() => ({onLoad: true}));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 20,
    marginTop: height * 0.0173,
    marginBottom: height * 0.0173,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    borderRadius: height * 0.015,
    shadowColor: '#DEDEDE',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  imageView: {
    borderTopLeftRadius: height * 0.013,
    borderTopRightRadius: height * 0.013,
    overflow: 'hidden',
    backgroundColor: '#dcdde1',
    width: width - 22,
    height: 200,
    justifyContent: 'center',
  },
  bottom: {
    height: height * 0.112,
    borderRadius: height * 0.013,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: height * 0.028,
    color: '#2c3e50',
  },
});