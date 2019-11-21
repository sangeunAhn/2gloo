import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Linking,
} from 'react-native';
import BackButton2 from '../Button/BackButton2';
import MasonryView from '..//Photo/MasonryList';
import HeaderScrollView from 'react-native-header-scroll-view';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

export default class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      onLoad: false,
    };
  }

  render() {
    return (
      <>
        {this.props.recordIsGetting ? (
          <View style={styles.container}>
            <BackButton2 navigation={this.props.navigation} />
            {/*  */}
            <Menu
              style={{
                position: 'absolute',
                right: 2,
                top: Platform.OS === 'ios' ? 35 : 20,
                zIndex: 1,
                // backgroundColor: 'red',
              }}>
              <MenuTrigger
                style={{
                  paddingVertia: 5,
                  paddingHorizontal: 10,
                }}>
                <SafeAreaView>
                  <Icon name="dots-three-horizontal" size={20} />
                </SafeAreaView>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  paddingLeft: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  width: 130,
                  height: 40,
                  justifyContent: 'space-around',
                }}>
                <MenuOption
                  value={2}
                  style={{marginTop: 3}}
                  onSelect={() =>
                    Linking.openURL('http://pf.kakao.com/_PJcxkT/chat')
                  }
                  text="신고하기"
                />
              </MenuOptions>
            </Menu>
            {/*  */}
            <View style={styles.container}>
              <HeaderScrollView
                containerStyle={{backgroundColor: '#FAFAFA'}}
                headerContainerStyle={styles.headerContainerStyle}
                headlineStyle={styles.headlineStyle}
                headerComponentContainerStyle={
                  styles.headerComponentContainerStyle
                }
                titleStyle={styles.titleStyle}
                fadeDirection="up"
                scrollViewProps={{showsVerticalScrollIndicator: false}}
                title="기록">
                {this.props.imageRoom.length === 0 ? (
                  <>
                    <View style={styles.noImageView}>
                      <Text style={styles.noImageText}>
                        활동 사진이 없습니다.
                      </Text>
                    </View>
                  </>
                ) : (
                  <MasonryView {...this.props} />
                )}
              </HeaderScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    );
  }

  _onLoad = () => {
    this.setState(() => ({onLoad: true}));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    marginBottom: 10,
  },
  noImageView: {
    width: width,
    paddingTop: height * 0.01,
    height: height * 0.6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  noImageText: {
    fontSize: width * 0.035,
    color: '#BBBBBB',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
