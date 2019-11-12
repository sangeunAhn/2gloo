import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import AutoHeightImage from 'react-native-auto-height-image';

const {width, height} = Dimensions.get('window');

export default class ClubChars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: '',
    };
  }

  componentDidMount() {
    Permissions.check('photo').then(response => {
      this.setState({photoPermission: response});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={this._pickImage}>
            <View style={styles.image}>
              <AutoHeightImage
                width={width - 20}
                source={require('../../images/addPhoto5.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line1} />
        <TouchableOpacity onPress={this._pickImage}>
          <Text style={styles.warning}>
            부적절한 사진 업로드 시{'\n'}불이익을 받을 수 있습니다.
          </Text>
        </TouchableOpacity>
        <View style={styles.line2} />
        <View style={styles.bottom}>
          <Text style={styles.text}>간단한 코멘트를 입력해주세요</Text>
        </View>
      </View>
    );
  }

  // 이미지피커
  _pickImage = async () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.7,
    };

    const response = await Permissions.request('photo');
    this.setState({photoPermission: response});

    if (this.state.photoPermission === 'authorized') {
      setTimeout(() => {
        this.props.changeAddLoading();
      }, 1000);

      ImagePicker.launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          this.props.changeAddLoading();
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          this.props.changeAddLoading();
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          this.props.changeAddLoading();
        } else {
          await this.props.addImage(response.uri);
          this.props.changeAddLoading();
        }
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: width - 20,
    margin: height * 0.02,

    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#E1E1E1',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  line1: {
    width: width * 0.98,
    height: 10,
    backgroundColor: 'white',
    top: -5,
  },
  line2: {
    width: width * 0.7,
    height: 2,
    backgroundColor: '#dcdde1',
  },
  image: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    overflow: 'hidden',
  },
  warning: {
    top: -height * 0.03,
    textAlign: 'center',
    fontSize: height * 0.0215,
    color: '#C1D0DC',
    lineHeight: height * 0.035,
  },
  bottom: {
    height: height * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: height * 0.026,
    color: '#bebebe',
  },
});
