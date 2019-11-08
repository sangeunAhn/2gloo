import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MakeClub2 from './presenter2';

const {width, height} = Dimensions.get('window');

const MakeClub = props => (
  <>
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => {
        props.navigation.goBack();
      }}>
      <SafeAreaView>
        <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
      </SafeAreaView>
    </TouchableOpacity>
    {props.isGetting == false &&
    props.navigation.getParam('from', 'NO-ID') == 'm' ? (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    ) : (
      <View style={styles.container}>
        {Platform.OS === 'android' ? (
          <MakeClub2 {...props} />
        ) : (
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
            <MakeClub2 {...props} />
          </KeyboardAvoidingView>
        )}
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: width * 0.2,
    height: height * 0.1,
    top: Platform.OS === 'ios' ? 30 : 15,
    left: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: height * 0.1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  MainPictureClick: {
    alignItems: 'center',
    marginTop: height * 0.007,
    marginHorizontal: width * 0.05,
  },
  PhotoAddMainPicture: {
    width: height * 0.052,
    height: height * 0.052,
    position: 'absolute',
    zIndex: 1,
    right: -height * 0.024,
    bottom: -height * 0.024,
  },

  warning: {
    top: -height * 0.2,
    textAlign: 'center',
    fontSize: height * 0.0215,
    color: '#C1D0DC',
    lineHeight: height * 0.035,
  },
  MainPictureImage: {
    marginTop: 5,
    width: width * 0.9,
    height: height * 0.23,
    borderRadius: height * 0.024,
    backgroundColor: '#CEE1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    top: -width * 0.07,
    zIndex: 1,
  },
  logoClick: {
    width: width * 0.27,
    height: width * 0.27,
    top: -width * 0.07,
    zIndex: 1,
    backgroundColor: '#ADCDE9',
    borderRadius: width * 0.27 * 0.5,
  },
  photoAddLogo: {
    width: height * 0.052,
    height: height * 0.052,
    position: 'absolute',
    zIndex: 1,
    right: -height * 0.007,
    bottom: -height * 0.007,
  },
  logoImage: {
    width: width * 0.27,
    height: width * 0.27,
    borderRadius: width * 0.27 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFromClubName: {
    paddingHorizontal: width * 0.05,
  },
  input: {
    borderRadius: height * 0.01,
    width: '100%',
    padding: height * 0.009,
    backgroundColor: 'white',
    fontSize: height * 0.021,
    marginTop: height * 0.007,
  },
  text: {
    fontSize: height * 0.021,
  },
  text1: {
    fontSize: height * 0.021,
    paddingHorizontal: width * 0.05,
  },
  block: {
    paddingBottom: height * 0.042,
  },
  button: {
    height: height * 0.09,
    marginTop: height * 0.042,
    paddingHorizontal: width * 0.03,
  },
  blank: {
    width: width,
    height: height * 0.03,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.112,
  },
});

export default MakeClub;
