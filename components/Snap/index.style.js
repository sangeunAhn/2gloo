import {StyleSheet, Dimensions, Platform} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#FAFAFA',
  background2: '#21D4FD',
};

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 30 : 15,
    width: width,
    height: height * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleText: {
    color: '#3B3B3B',
    fontSize: width * 0.08,
    letterSpacing: 0.05,
    fontWeight: '900',
  },
  scrollview: {
    height: height * 0.45,
  },
  exampleContainer: {
    paddingTop: height * 0.03,
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },

  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});
