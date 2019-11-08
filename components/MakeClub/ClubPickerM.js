import React, {Component} from 'react';
import {View, Text, Picker, Dimensions, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

class ClubPickerM extends Component {
  state = {user: this.props.clubKind};
  state = {
    icon: <AntDesign name="bars" size={height * 0.035} color="#0A6EFF" />,
  };
  updateUser = user => {
    this.setState({user: user});
    this.props.setPrevClubKind(user);
  };

  UNSAFE_componentWillMount = () => {
    this.setState({user: this.props.clubKind});
  };

  render() {
    return (
      <View>
        <Picker
          style={
            width > 900 ? {transform: [{scaleX: 1.5}, {scaleY: 1.5}]} : null
          }
          mode="dropdown"
          selectedValue={this.props.clubKind}
          onValueChange={this.updateUser}>
          <Picker.Item label="학술/교양" value="학술/교양" />
          <Picker.Item label="예술/문화/공연" value="예술/문화/공연" />
          <Picker.Item label="자격증" value="자격증" />
          <Picker.Item label="체육" value="체육" />
          <Picker.Item label="취업" value="취업" />
          <Picker.Item label="창업" value="창업" />
          <Picker.Item label="봉사/사회" value="봉사/사회" />
          <Picker.Item label="어학" value="어학" />
          <Picker.Item label="친목" value="친목" />
          <Picker.Item label="오락/게임" value="오락/게임" />
          <Picker.Item label="기타" value="기타" />
        </Picker>
      </View>
    );
  }
}

export default ClubPickerM;
