import React from 'react';
import {StyleSheet, View, Dimensions, Text, Platform} from 'react-native';
import SchoolBtn from '../../../components/Button/SchoolBtn';

const {width, height} = Dimensions.get('window');

const Schools = props => (
  <>
    <View style={styles.container}>
      <Text style={styles.title}>학교 선택</Text>
      <View style={{flexDirection: 'column', height: height * 0.83}}>
        <View style={styles.schools}>
          <SchoolBtn
            school={'울산대학교'}
            backgroundColor={'white'}
            lineColor={'#e67e22'}
            onPress={props.AAPress}
          />
        </View>
        <View style={styles.schools1} />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? height * 0.1 : height * 0.07,
    marginLeft: width * 0.05,
    marginBottom: height * 0.02,
    fontSize: width * 0.075,
    fontWeight: '700',
  },
  schools: {
    flex: 1,
    marginHorizontal: width * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  schools1: {
    flex: 1,
    marginHorizontal: width * 0.03,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: width * 0.04,
  },
});
// module.exports = Schools;
export default Schools;
