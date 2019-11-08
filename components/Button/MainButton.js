import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {moderateScale} from '../../components/Scaling';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export default class MainButton extends Component {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#f0f0f0',
    titleColor: 'white',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.button}>
          <LinearGradient
            colors={['#E4F0FA', '#C2DFF9', '#B0D5F9']}
            style={styles.button2}>
            <View style={styles.button2}>
              <Text
                style={[
                  styles.title,
                  {color: this.props.titleColor, fontSize: moderateScale(22)},
                ]}>
                {this.props.title}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: wp(66),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    borderRadius: height * 0.08 * 0.2,
    height: height * 0.08,
    shadowColor: '#E1E1E1', // IOS
    shadowOffset: {height: 3, width: 1}, // IOS
    shadowOpacity: 3, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  button2: {
    width: wp(66),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height * 0.08 * 0.2,
    height: height * 0.08,
  },
  title: {
    fontWeight: 'bold',
  },
});
