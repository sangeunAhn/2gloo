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
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

class Char extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delBtn: this.props.delBtn,
    };
  }

  render() {
    const {removeChar, id} = this.props;
    return (
      <>
        <View>
          {this.state.delBtn == false ? (
            <TouchableOpacity style={styles.button} onPress={this._charPress}>
              <View style={styles.button2}>
                <Text style={styles.text}>#{this.props.text}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={this._charPress}>
              <View style={styles.button2}>
                <Text style={styles.text2}>#{this.props.text}</Text>
                <TouchableOpacity
                  style={{position: 'absolute'}}
                  onPress={() => removeChar(id)}>
                  <AntDesign
                    name="closecircleo"
                    size={width * 0.06}
                    color="#3B3B3B"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }

  _charPress = async () => {
    (await this.state.delBtn) == false
      ? this.setState({delBtn: true})
      : this.setState({delBtn: false});
  };
}

const styles = StyleSheet.create({
  whole: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: height * 0.055 * 0.5,
    height: height * 0.055,
    marginBottom: height * 0.02,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: height * 0.055 * 0.5,
    height: height * 0.055,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.02,
    marginHorizontal: 7,
    flexDirection: 'row',
    shadowColor: '#D7D7D7', // IOS
    shadowOffset: {height: 1, width: 0}, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  text: {
    color: '#3B3B3B',
    paddingHorizontal: 12,
    fontSize: width * 0.04,
  },
  text2: {
    color: 'white',
    paddingHorizontal: 12,
    fontSize: width * 0.04,
  },
});

export default Char;
