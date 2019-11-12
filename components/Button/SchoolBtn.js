import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ConfirmButton extends Component {
  static defaultProps = {
    buttonColor: '#28E7FF',
    titleColor: '#fff',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <View style={styles.logo}>
            {this.props.school === '울산대학교' ? (
              <Image
                style={styles.logoImage}
                source={require('../../images/ulsan.png')}
              />
            ) : this.props.school === '강민대학교' ? (
              <Image
                style={styles.logoImage}
                source={require('../../images/BB.png')}
              />
            ) : (
              <Image
                style={styles.logoImage}
                source={require('../../images/CC.png')}
              />
            )}
            {/* <Image style={styles.logoImage} source={require('../../images/ulsan.jpeg')} /> */}
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.school}</Text>
          </View>
          <View style={styles.address}>
            {this.props.school === '상언대학교' ? (
              <Text style={styles.addressText}>{'울산광역시 \n남구'}</Text>
            ) : this.props.school === '강민대학교' ? (
              <Text style={styles.addressText}>{'부산광역시 \n북구'}</Text>
            ) : (
              <Text style={styles.addressText}>{'울산광역시 \n동구'}</Text>
            )}
            {/* <Text style={styles.addressText}>{'울산광역시 \n남구'}</Text> */}
          </View>
          <View style={[styles.symbolLine, {borderColor: 'green'}]} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 145,
    height: 255,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#E1E1E1', // IOS
    shadowOffset: {height: 3, width: 0}, // IOS
    shadowOpacity: 3, // IOS
    shadowRadius: 3, //IOS
    elevation: 1.5,
  },
  logo: {
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 55*0.5,
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 50,
    elevation: 2,
    shadowColor: 'rgba(0,0,.2, .2)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 1,
    shadowRadius: 1.5,
  },
  logoImage: {
    width: 55,
    height: 55,
    borderRadius: 55*0.5,
    overflow: 'hidden',
  },
  title: {
    marginLeft: 18,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#707070',
  },
  address: {
    marginLeft: 18,
    marginTop: 7,
  },
  addressText: {
    fontSize: 14,
    color: '#BBBBBB',
    lineHeight: 23,
  },
  symbolLine: {
    marginTop: 20,
    marginLeft: 18,
    borderBottomWidth: 6,
    borderRadius: 10,
    width: 33,
  },
});
