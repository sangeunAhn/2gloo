import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import {scale, moderateScale, verticalScale} from '../../../components/Scaling';
import PhotoRegister from '../../../components/Photo/PhotoRegister';
import PhotoModify from '../../../components/Photo/PhotoModify';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderScrollView from 'react-native-header-scroll-view';
import PhotoLoading from '../../../components/Photo/PhotoLoding';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';
import BackButton from '../../../components/Button/BackButton';

const {width, height} = Dimensions.get('window');

const MakeRecordPictures = props => (
  <>
    {props.isGetting == false &&
    props.navigation.getParam('to', 'NO-ID') == 'm' ? (
      <ActivityIndicator size="large" />
    ) : (
      <>
        <BackButton navigation={props.navigation} />

        {props.count === 0 ? (
          <>
            {props.navigation.getParam('to', 'NO-ID') == 'm' ? (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={props.btnDeleteAll}>
                <SafeAreaView>
                  <Text style={styles.btnText}>기록 제거</Text>
                </SafeAreaView>
              </TouchableOpacity>
            ) : (
              <View style={styles.addBtn}>
                <SafeAreaView>
                  <Text style={[styles.btnText, {color: '#bdc3c7'}]}>게시</Text>
                </SafeAreaView>
              </View>
            )}
          </>
        ) : (
          <>
            {props.isSubmitting ? (
              <TouchableOpacity style={styles.addBtn}>
                <SafeAreaView>
                  <ActivityIndicator color="black" />
                </SafeAreaView>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.addBtn} onPress={props.btnPress}>
                <SafeAreaView>
                  <Text style={styles.btnText}>게시</Text>
                </SafeAreaView>
              </TouchableOpacity>
            )}
          </>
        )}

        <HeaderScrollView
          containerStyle={{backgroundColor: '#FAFAFA'}}
          headerContainerStyle={{
            backgroundColor: '#FAFAFA',
            justifyContent: 'center',
            alignItems: 'center',
            height: Platform.OS === 'ios' ? height * 0.1 : height * 0.08,
            ...ifIphoneX({paddingTop: 18}, {paddingTop: 0}),
          }}
          headlineStyle={{
            height: height * 0.1,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            fontSize: width * 0.05,
            paddingTop: Platform.OS === 'ios' ? height * 0.065 : height * 0.048,
          }}
          headerComponentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.08,
          }}
          titleStyle={{
            // paddingTop: Platform.OS === 'ios' ? 15 : 0,
            color: '#3B3B3B',
            fontSize: width * 0.075,
          }}
          fadeDirection="up"
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          title="기록 생성">
          <View style={styles.container}>
            {/* 사진 넣는 곳 */}
            {Object.values(props.images).map(image => (
              <PhotoModify
                key={image.id}
                deleteImage={props.deleteImage}
                updateImage={props.updateImage}
                updateComment={props.updateComment}
                changeUpdateLoading={props.changeUpdateLoading}
                {...image}
              />
            ))}
            {props.addLoading ? <PhotoLoading /> : null}

            <PhotoRegister
              addImage={props.addImage}
              changeAddLoading={props.changeAddLoading}
            />
          </View>
          <View style={{height: 80}} />
        </HeaderScrollView>
      </>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: height * 0.028,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    padding: 10,
  },
  backBtn: {
    position: 'absolute',
    width: width * 0.2,

    height: height * 0.07,
    top: Platform.OS === 'ios' ? 30 : 15,

    left: height * 0.014,
    zIndex: 1,
    //   backgroundColor: 'blue'
  },
  addBtn: {
    position: 'absolute',
    width: width * 0.25,
    height: height * 0.07,
    top: Platform.OS === 'ios' ? height * 0.03 : 15,
    right: height * 0.014,
    zIndex: 1,
    alignItems: 'flex-end',
    // backgroundColor: 'blue'
  },
  btnText: {
    fontSize: width * 0.05,
    color: '#3B3B3B',
    fontWeight: '600',
    ...ifIphoneX({paddingTop: 5}, {paddingTop: 0}),
  },
});

export default MakeRecordPictures;
