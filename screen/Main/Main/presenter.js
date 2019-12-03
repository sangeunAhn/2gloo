import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Text,
  Linking,
} from 'react-native';
import ClubDiv from '../../../components/Main/ClubDiv';
import HeaderScrollView from 'react-native-header-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Modal from 'react-native-simple-modal';
import BackButton from '../../../components/Button/BackButton';

const {width, height} = Dimensions.get('window');

const ClubRecordPictures = props => (
  <>
    <View style={styles.container}>
      <BackButton navigation={props.navigation} />
      {props.schoolName === props.userSchool ? (
        <Menu style={styles.menu}>
          <MenuTrigger style={styles.menuTrigger}>
            <SafeAreaView>
              <Icon name="dots-three-horizontal" size={20} />
            </SafeAreaView>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionsContainerStyle}>
            {props.existClub === '생성' ? (
              <MenuOption
                value={1}
                onSelect={props.goToCreateClub}
                text="모임 생성"
              />
            ) : (
              <MenuOption
                value={1}
                onSelect={props.goToUpdateClub}
                text="모임 삭제"
              />
            )}
            <MenuOption
              value={2}
              style={{marginTop: 3}}
              onSelect={props.openModal}
              text="문의하기"
            />
          </MenuOptions>
        </Menu>
      ) : (
        <></>
      )}

      <HeaderScrollView
        headerContainerStyle={styles.headerContainerStyle}
        headlineStyle={styles.headlineStyle}
        headerComponentContainerStyle={styles.headerComponentContainerStyle}
        titleStyle={styles.titleStyle}
        fadeDirection="up"
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        title={props.schoolName}>
        {props.kindsOrder.map((kinds, i) => {
          return (
            <Collapse
              isCollapsed={props.collapseArray[i]}
              onToggle={isCollapsed =>
                props.changeCollapseArray(isCollapsed, i)
              }>
              <CollapseHeader>
                <View style={{paddingHorizontal: width * 0.03}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.menuTitle}>{kinds}</Text>
                    {props.collapseArray[i] === true ? (
                      <Ionicons
                        style={{alignSelf: 'flex-end', marginBottom: -2}}
                        name="ios-arrow-up"
                        size={23}
                        color="#a7bfe8"
                      />
                    ) : (
                      <Ionicons
                        style={{alignSelf: 'flex-end', marginBottom: -2}}
                        name="ios-arrow-down"
                        size={23}
                        color="#a7bfe8"
                      />
                    )}
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginBottom: height * 0.032,
                    }}>
                    <View style={styles.line} />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <ClubDiv
                  key={i}
                  clubKind={kinds}
                  school={props.schoolName}
                  {...props}
                />
              </CollapseBody>
            </Collapse>
          );
        })}
      </HeaderScrollView>
    </View>
    <Modal
      modalDidOpen={props.modalDidOpen}
      modalDidClose={props.modalDidClose}
      open={props.open}
      closeOnTouchOutside={true}
      modalStyle={styles.modal}>
      <View style={{marginTop: 10, marginBottom: 15, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>문의사항</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 15, marginBottom: 40}}>
        <Text
          style={{fontSize: width * 0.03, marginBottom: 10}}
          onPress={() => Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')}>
          1:1 문의하기
        </Text>
        <Text
          style={{fontSize: width * 0.03, marginBottom: 10}}
          onPress={() => {
            Linking.openURL('tel:01043720440');
          }}>
          010 4372 0440
        </Text>
        <Text style={{fontSize: width * 0.03}}>leejjun28@gmail.com</Text>
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: '#848484', fontSize: width * 0.02}}>
          문의 가능 시간 : 09:00 ~ 18:00
        </Text>
      </View>
    </Modal>
  </>
);

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: 30,
    height: 40,
    top: Platform.OS === 'ios' ? 30 : 15,
    left: width * 0.028,
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    right: -3,
    top: Platform.OS === 'ios' ? 35 : 15,
    zIndex: 1,
    // backgroundColor: 'red',
  },
  menuTrigger: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionsContainerStyle: {
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 10,
    width: 130,
    height: 80,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 23,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  scroll: {
    flex: 1,
    paddingTop: 10,
  },
  div: {
    height: height * 0.1,
    // backgroundColor:'#dcdcdc',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  school: {
    fontSize: width * 0.06,
  },
  title: {
    fontSize: 30,
  },
  headerContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...ifIphoneX({paddingTop: 18}, {paddingTop: 0}),
    height: Platform.OS === 'ios' ? height * 0.1 : height * 0.08,
  },
  headlineStyle: {
    height: height * 0.1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: width * 0.05,
    paddingTop: Platform.OS === 'ios' ? height * 0.055 : height * 0.048,
  },
  headerComponentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
  },
  titleStyle: {
    // paddingTop: Platform.OS === 'ios' ? 15 : 0,
    color: '#3B3B3B',
    fontSize: width * 0.075,
  },
  menuTitle: {
    paddingTop: height * 0.015,
    fontWeight: 'bold',
    color: '#ADCDE9',
    fontSize: height * 0.03,
  },
  line: {
    borderBottomWidth: height * 0.001,
    borderColor: '#ADCDE9',
    width: '85%',
    alignItems: 'flex-end',
  },
  modal: {
    borderRadius: 3,
    margin: 20,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default ClubRecordPictures;
