import React from 'react';
import {Image} from 'react-native';
import * as axios from 'axios';
import uuidv1 from 'uuid/v1';
import MakeRecordPictures from './presenter';
import ImageResizer from 'react-native-image-resizer';

export default class RecordRegister extends React.Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
		this.state = {
			images: {},
			disabled: false,
			count: 0,
			text: '',
			plds: [],
			comment: '',
			name: '',
			isSubmitting: false,
			isGetting: false,
			idCount: 0,
			addLoading: false,
			imageWidth: 0,
			imageHeight: 0,
		};
	}

	render() {
		return (
			<MakeRecordPictures
				{...this.state}
				{...this.props}
				addImage={this._addImage}
				deleteImage={this._deleteImage}
				updateImage={this._updateImage}
				updateComment={this._updateComment}
				btnPress={this._btnPress}
				btnDeleteAll={this._btnDeleteAll}
				changeAddLoading={this._changeAddLoading}
				changeUpdateLoading={this._changeUpdateLoading}
			/>
		);
	}

	UNSAFE_componentWillMount = async () => {
		if (this.props.navigation.getParam('to', 'NO-ID') === 'm') {
			await this._getDatas();
		}
	};

	_addImage = async image => {
		const t = this;
		let tmp = await ImageResizer.createResizedImage(image, 600, 600, 'JPEG', 100);
		image = tmp.uri;
		this.setState(prevState => {
			const ID = t.state.idCount.toString();
			const {count, idCount} = this.state;
			const newToDoObject = {
				[ID]: {
					id: ID,
					image,
					comment: '',
					createdAt: Date.now(),
					updateLoading: false,
				},
			};
			const newState = {
				count: count + 1,
				idCount: idCount + 1,
				images: {
					...prevState.images,
					...newToDoObject,
				},
			};
			return {...newState};
		});
	};

	_addImageM = async (image, comment, createdAt, width, height) => {
		const t = this;
		this.setState(prevState => {
			const ID = t.state.idCount.toString();
			const {count, idCount} = this.state;
			const newToDoObject = {
				[ID]: {
					id: ID,
					image,
					comment: comment,
					createdAt: createdAt,
					updateLoading: false,
				},
			};
			const newState = {
				count: count + 1,
				idCount: idCount + 1,
				images: {
					...prevState.images,
					...newToDoObject,
				},
			};
			return {...newState, imageWidth: width, imageHeight: height};
		});
	};

	_deleteImage = id => {
		this.setState(prevState => {
			const images = prevState.images;
			const count = this.state.count;
			delete images[id];
			const newState = {
				...prevState,
				...images,
				count: count - 1,
			};
			return {...newState};
		});
	};

	_updateImage = async (id, image) => {
		let tmp = await ImageResizer.createResizedImage(image, 600, 600, 'JPEG', 100);
		image = tmp.uri;
		this.setState(prevState => {
			const newState = {
				...prevState,
				images: {
					...prevState.images,
					[id]: {...prevState.images[id], image},
				},
			};
			return {...newState};
		});
	};

	_updateComment = async (id, comment) => {
		await this.setState(prevState => {
			const newState = {
				...prevState,
				images: {
					...prevState.images,
					[id]: {...prevState.images[id], comment: comment},
				},
			};
			return {...newState};
		});
	};

	_getDatas = async () => {
		//userNo 가지고 오기
		const {navigation} = this.props;
		var recordNo = navigation.getParam('recordNo', 'NO-ID');
		const t = this;

		// 데이터 가져오기
		await axios
			.post('http://13.209.221.206/php/MakeClub/GetRecordPictureM.php', {
				recordNo: recordNo,
			})
			.then(function(response) {
				t._setDatas(response);
			});

		this.setState({isGetting: true});
	};
	_setDatas = async response => {
		const t = this;
		for (var item of response.data) {
			await t._addImageM(item.recordPicture, item.recordContent, item.createdAt, item.width, item.height);
		}
	};

	_btnPress = async () => {
		const {navigation} = this.props;
		this.setState({isSubmitting: true});
		await this._input1();
		if (navigation.getParam('to', 'NO-ID') === 'm') {
			await this._deletePrevDatas();
		}
		this.props.navigation.navigate('MakeRecord');
	};

	_deletePrevDatas = async () => {
		const {navigation} = this.props;
		const recordNo = navigation.getParam('recordNo', 'NO-ID');
		const t = this;
		await axios
			.post('http://13.209.221.206/php/MakeClub/GetPrevRecords.php', {
				recordNo: recordNo,
			})
			.then(async response => {
				await t._deleteDatas(response);
			});
	};

	_deleteDatas = async response => {
		for (var item of response.data) {
			await axios.post('http://13.209.221.206/php/MakeClub/DeletePrevRecords.php', {
				recordPicture: item.recordPicture,
			});
		}
	};

	_input1 = async () => {
		const imageRoom = uuidv1();
		const {images} = this.state;
		const t = this;
		await Promise.all(
			Object.values(images).map(image => t._inputDatas(image.image, image.comment, image.createdAt, imageRoom)),
		);
	};

	_inputDatas = async (image, comment, createdAt, imageRoom) => {
		const {navigation} = this.props;
		var userNo = navigation.getParam('userNo', 'NO-ID');
		let formData = new FormData();
		comment = await comment.replace(/'/g, '`');
		formData.append('image', {
			uri: image,
			name: 'image.jpeg',
			type: 'image/jpeg',
		});
		formData.append('recordContent', comment);
		formData.append('userNo', userNo);
		formData.append('imageRoom', imageRoom);
		formData.append('createdAt', createdAt);

		// 데이터베이스에 넣기
		await fetch('http://13.209.221.206/php/MakeClub/SetRecord.php', {
			method: 'POST',
			body: formData,
			header: {
				'content-type': 'multipart/form-data',
			},
		});
	};

	_handleBackButtonClick = () => {
		this.props.navigation.goBack();
		return true;
	};

	_btnDeleteAll = () => {
		this._deletePrevDatas();
		this.props.navigation.goBack();
	};

	_changeAddLoading = () => {
		const addLoading = this.state.addLoading;
		{
			addLoading ? this.setState({addLoading: false}) : this.setState({addLoading: true});
		}
	};

	_changeUpdateLoading = id => {
		const updateLoading = this.state.images[id].updateLoading;
		{
			updateLoading
				? this.setState(prevState => {
						const newState = {
							...prevState,
							images: {
								...prevState.images,
								[id]: {...prevState.images[id], updateLoading: false},
							},
						};
						return {...newState};
				  })
				: this.setState(prevState => {
						const newState = {
							...prevState,
							images: {
								...prevState.images,
								[id]: {...prevState.images[id], updateLoading: true},
							},
						};
						return {...newState};
				  });
		}
	};
}
