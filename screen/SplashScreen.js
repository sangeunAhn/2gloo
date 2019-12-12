import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={styles.imageStyles}
          source={require('../images/logo.png')}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: width,
    height: height,
  },
};

export default SplashScreen;
