import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <SafeAreaView>
          <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
        </SafeAreaView>
      </TouchableOpacity>
    );
  }

  _onLoad = () => {
    this.setState(() => ({onLoad: true}));
  };
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: 30,
    height: 40,
    top: 30,
    left: width * 0.028,
    zIndex: 1,
  },
});
