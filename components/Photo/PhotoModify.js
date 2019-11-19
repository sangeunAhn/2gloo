import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, TextInput} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import PhotoLoading from './PhotoLoding';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export default class PhotoModify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentValue: '',
			disabled: true,
			height: 0,
			photoPermission: '',
		};
	}

	componentDidMount() {
		Permissions.check('photo').then(response => {
			this.setState({photoPermission: response});
		});
	}

	UNSAFE_componentWillMount = async () => {
		Image.getSize(this.props.image, (width, height) => {
			const screenWidth = Dimensions.get('window').width;
			const getHeight = (height * screenWidth - 20) / width;
			this.setState({height: getHeight});
		  });
		  const {comment} = this.props;
		  this.setState({commentValue: comment});
	};

	Press = () => {
		this.state.disabled == true ? this.setState({disabled: false}) : this.setState({disabled: true});
	};

	static propTypes = {
		id: PropTypes.string.isRequired,
		deleteImage: PropTypes.func.isRequired,
		image: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired,
		updateLoading: PropTypes.bool.isRequired,
	};
	render() {
		const {id, deleteImage, image} = this.props;
		var {height, width} = Dimensions.get('window');
		return (
			<>
				{this.props.updateLoading ? (
					<PhotoLoading />
				) : (
					<View style={styles.container}>
						<View style={styles.body}>
							<TouchableOpacity onPress={this.Press}>
								<View style={styles.image}>
									<FastImage
										style={{
											width: width - 20,
											height: this.state.height,
										}}
										source={{uri: image}}
									/>
								</View>
								{this.state.disabled == true ? null : (
									<View style={styles.box}>
										<View style={styles.edit}>
											<TouchableOpacity onPress={this._pickImage}>
												<Feather name="edit" size={width * 0.15} color="black" />
											</TouchableOpacity>
										</View>
										<View style={styles.delete}>
											<TouchableOpacity onPressOut={() => deleteImage(id)}>
												<Entypo name="circle-with-cross" size={width * 0.15} color="black" />
											</TouchableOpacity>
										</View>
									</View>
								)}
							</TouchableOpacity>
						</View>

						<View style={styles.bottom}>
							<TextInput
								style={styles.text}
								placeholder={'간단한 코멘트를 입력해주세요'}
								placeholderTextColor={'#bebebe'}
								maxLength={20}
								onChangeText={comment => this._updateComment(comment)}
								value={this.state.commentValue}
								autoCorrect={false}
							/>
						</View>
					</View>
				)}
			</>
		);
	}

	_updateComment = comment => {
		this.setState({commentValue: comment});
		const {id, updateComment} = this.props;
		updateComment(id, comment);
	};

	// 이미지피커
	_pickImage = async () => {
		const {id, updateImage} = this.props;
		const options = {
			title: 'Select Avatar',
			customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
			quality: 0.7,
		};

		await Permissions.request('photo').then(response => {
			this.setState({photoPermission: response});
		});

		if (this.state.photoPermission == 'authorized') {
			setTimeout(() => {
				this.props.changeUpdateLoading(id);
			}, 1000);

			ImagePicker.launchImageLibrary(options, async response => {
				if (response.didCancel) {
					console.log('User cancelled image picker');
					this.props.changeUpdateLoading(id);
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
					this.props.changeUpdateLoading(id);
				} else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
					this.props.changeUpdateLoading(id);
				} else {
					this.setState({image: response.uri, disabled: true});
					Image.getSize(response.uri, (width, height) => {
						const screenWidth = Dimensions.get('window').width;
						const getHeight = (height * screenWidth - 20) / width;
						this.setState({height: getHeight});
					});
					await updateImage(id, response.uri);
					this.props.changeUpdateLoading(id);
				}
			});
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: height * 0.015,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		borderRadius: 9,
		shadowColor: '#A8A8A8',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 5,
		shadowRadius: 5,
		elevation: 3,
	},
	image: {
		borderTopLeftRadius: 9,
		borderTopRightRadius: 9,
		overflow: 'hidden',
	},
	box: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		backgroundColor: 'white',
		opacity: 0.7,
	},
	edit: {
		position: 'absolute',
		top: 0,
		left: '25%',
		right: 0,
		bottom: 0,
		justifyContent: 'center',
	},
	delete: {
		position: 'absolute',
		top: 0,
		right: '25%',
		bottom: 0,
		justifyContent: 'center',
	},
	bottom: {
		height: height * 0.115,
		borderRadius: height * 0.015,
		backgroundColor: 'white',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: height * 0.028,
		color: '#3B3B3B',
	},
});
