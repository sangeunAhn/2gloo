import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default class ConfirmButton extends Component {
  static defaultProps = {
    buttonColor: '#ADCDE9',
    titleColor: '#3B3B3B',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.button, {backgroundColor: this.props.buttonColor}]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <LinearGradient
            colors={['#CBDFF1', '#8DB5D6']}
            style={styles.button2}>
            {this.props.title == '로딩' ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[styles.title, {color: this.props.titleColor}]}>
                {this.props.title}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    borderRadius: 15,
    height: height * 0.07,
    shadowColor: '#E1E1E1', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 3, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  button2: {
    width: width * 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: height * 0.07,
  },
  title: {
    fontSize: width * 0.052,
    fontWeight: '700',
  },
});
