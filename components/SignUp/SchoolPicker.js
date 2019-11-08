import React, {Component} from 'react';
import {View, Text, Picker, StyleSheet, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

class SchoolPicker extends Component {
  state = {school: ''};
  updateSchool = school => {
    this.setState({school});
    this.props.schoolChange(school);
  };

  render() {
    return (
      <View>
        <Picker
          style={
            width > 900 ? {transform: [{scaleX: 1.5}, {scaleY: 1.5}]} : null
          }
          mode="dropdown"
          selectedValue={this.state.school}
          onValueChange={this.updateSchool}>
          <Picker.Item label="상언대학교" value="상언대학교" />
          <Picker.Item label="강민대학교" value="강민대학교" />
        </Picker>
      </View>
    );
  }
}

export default SchoolPicker;
