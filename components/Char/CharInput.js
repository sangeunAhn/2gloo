import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {scale, moderateScale, verticalScale} from '../Scaling';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

class CharInput extends Component {
  state = {
    newChar: '',
    isFocused: false,
  };
  handleFocus = event => {
    this.setState({isFocused: true});
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  handleBlur = event => {
    this.setState({isFocused: false});
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.state = {disabled: false};
    this.state = {newChar: ''};
  }

  addNewChar = () => {
    if (this.state.newChar) {
      this.props.addChar(this.state.newChar);
      this.setState({
        newChar: '',
      });
    }
  };
  render() {
    const {isFocused} = this.state;
    return (
      <>
        <View style={styles.selectView}>
          <View style={styles.shap}>
            <Text
              style={
                this.state.newChar === '' ? styles.shapText1 : styles.shapText2
              }>
              #
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              {borderColor: isFocused ? '#75A9D6' : '#DCDCDC'},
            ]}
            placeholder={'직접입력'}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholderTextColor={'#DCDCDC'}
            value={this.state.newChar}
            onChangeText={newChar => this.setState({newChar})}
            maxLength={9}
          />

          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.addBtn}
              onPressOut={this.addNewChar}>
              <Text
                style={{fontSize: width * 0.04, color: 'white', zIndex: 999}}>
                추가
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  selectView: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: height * 0.03,
  },
  input: {
    height: height * 0.07,
    flex: 3,
    padding: 10,

    borderBottomWidth: 1,
    fontSize: width * 0.05,
    marginRight: 15,
  },
  shap: {
    justifyContent: 'flex-end',
    
    left: 8,
  },
  shapText1: {
    fontSize: width * 0.05,
    color: '#DCDCDC',
    top: -8,
  },
  shapText2: {
    fontSize: width * 0.05,
    top: -8,
  },
  addBtn: {
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a7bfe8',
    height: height * 0.055,
    width: width * 0.15,

    borderColor: '#f1b3ae',
    borderRadius: width * 0.15 * 0.2,
    shadowColor: '#D7D7D7', // IOS
    shadowOffset: {height: 1, width: 0}, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  btnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CharInput;
