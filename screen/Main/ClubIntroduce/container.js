import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import * as axios from 'axios';
import ClubIntroduce from './presenter';

const {width, height} = Dimensions.get('window');

class Container extends Component {
	static navigationOptions = {
		header: null,
		headerTransparent: true,
	};

	constructor(props) {
		super(props);
		this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
		this.state = {
			clubName: '',
			clubPhoneNumber: '',
			clubKakao: '',
			clubIntroduce: '',
			clubLogo: null,
			clubMainPicture: null,
			clubChar: [],
			isGetting1: false,
			isGetting2: false,
			isImageViewVisible: false,
			imageViewIndex: 0,
			imgWidth: 0,
			value: 5,
			data: [],
			options: {},
			clubSize: 0.5,
			clubAutonomous: 0.5,
			clubFunny: 0.5,
			clubFriendship: 0.5,
			records: [],
			recordIsGetting: false,
			imageRoom: [],
			leftRecords: [],
			rightRecords: [],
		};
	}

	render() {
		return (
			<ClubIntroduce
				{...this.state}
				{...this.props}
				imageViewVisible1={this._imageViewVisible1}
				imageViewVisible2={this._imageViewVisible2}
				gotoRecord={this._gotoRecord}
				goToPictures={this._goToPictures}
				onSwipeRight={this._onSwipeRight}
			/>
		);
	}

	UNSAFE_componentWillMount = async () => {
		this._getIntroduceData();
		this._getChars();
		await this._getImageRoom();
		this._recordView();
	};

	_gotoRecord = () => {
		const {navigation} = this.props;
		var clubNo = navigation.getParam('clubNo', 'NO-ID');

		this.props.navigation.navigate('Record', {
			clubNo,
		});
	};

	_getIntroduceData = async () => {
		const t = this;
		const {navigation} = this.props;
		var clubNo = navigation.getParam('clubNo', 'NO-ID');

		// 데이터 가져오기
		await axios
			.post('http://13.209.221.206/php/Main/GetClubIntroduce.php', {
				clubNo,
			})
			.then(function(response) {
				t._setDatas(response);
			});

		this.setState({isGetting1: true});
	};

	_setDatas = response => {
		var clubName = response.data.message.clubName;
		clubName = clubName.replace(/\\n/gi, '\n');
		this.setState({
			clubName,
		});

		var clubPhoneNumber = response.data.message.clubPhoneNumber;
		clubPhoneNumber = clubPhoneNumber.replace(/\\n/gi, '\n');
		this.setState({
			clubPhoneNumber,
		});

		var clubKakao = response.data.message.clubKakao;
		clubKakao = clubKakao.replace(/\\n/gi, '\n');
		this.setState({
			clubKakao,
		});

		var clubIntroduce = response.data.message.clubIntroduce;
		clubIntroduce = clubIntroduce.replace(/\\n/gi, '\n');
		this.setState({
			clubIntroduce,
		});

		var clubLogo = response.data.message.clubLogo;
		this.setState({
			clubLogo,
		});

		var clubMainPicture = response.data.message.clubMainPicture;
		this.setState({
			clubMainPicture,
		});

		var clubSize = response.data.message.clubSize * 1;
		this.setState({
			clubSize,
		});

		var clubAutonomous = response.data.message.clubAutonomous * 1;
		this.setState({
			clubAutonomous,
		});

		var clubFunny = response.data.message.clubFunny * 1;
		this.setState({
			clubFunny,
		});

		var clubFriendship = response.data.message.clubFriendship * 1;
		this.setState({
			clubFriendship,
    });
	};

	//특성 가져오기
	_getChars = async () => {
		const t = this;
		const {navigation} = this.props;
		const {clubChar} = this.state;
		var clubNo = navigation.getParam('clubNo', 'NO-ID');

		// 데이터 가져오기
		await axios
			.post('http://13.209.221.206/php/Main/GetClubChars.php', {
				clubNo,
			})
			.then(result => {
				const response = result.data;
				var clubCharArray = new Array();

				response.forEach(row => {
					clubCharArray.push(row.chars);
				});

				this.setState({
					clubChar: clubChar.concat(clubCharArray),
					isGetting2: true,
				});
			});
	};

	_handleBackButtonClick = () => {
		this.props.navigation.goBack();

		return true;
	};

	_imageViewVisible1 = () => {
		this.setState({isImageViewVisible: true, imageViewIndex: 0});
	};

	_imageViewVisible2 = () => {
		this.setState({isImageViewVisible: true, imageViewIndex: 1});
	};

	_recordView = async () => {
		const {imageRoom} = this.state;
		const t = this;
		if (imageRoom.length !== 0) {
			for (var item of imageRoom) {
				await t._getRecordData(item);
			}
		} else {
			this.setState({recordIsGetting: true});
		}
		this.setState({recordIsGetting: true});
		this._distinguishHeight();
	};

	_distinguishHeight = async () => {
		const records = this.state.records;
		var leftHeight = 0,
			rightHeight = 0;
		var leftRecords = [];
		var rightRecords = [];

		for (var i = 0; i < records.length; i++) {
			if (leftHeight <= rightHeight) {
				leftHeight += records[i].height;
				await leftRecords.push(records[i]);
			} else {
				rightHeight += records[i].height;
				await rightRecords.push(records[i]);
			}
		}

		this.setState({
			leftRecords,
			rightRecords,
		});
	};

	_getImageRoom = async () => {
		//userNo 가지고 오기
		const {navigation} = this.props;
		var clubNo = navigation.getParam('clubNo', 'NO-ID');
		const t = this;
		var imageRoomArray = new Array();

		// 데이터 가져오기
		await axios
			.post('http://13.209.221.206/php/Main/GetImageRooms2.php', {
				clubNo,
			})
			.then(result => {
				const response = result.data;
				response.forEach(room => {
					imageRoomArray.push(room.imageRoom);
					t.setState({imageRoom: imageRoomArray});
				});
			});
	};

	// 이미지들 가져오기
	_getRecordData = async imageRoom => {
		//userNo 가지고 오기
		const {navigation} = this.props;
		var clubNo = navigation.getParam('clubNo', 'NO-ID');
		const t = this;

		// 데이터 가져오기
		await axios
			.post('http://13.209.221.206/php/Main/GetImages2.php', {
				clubNo,
				imageRoom,
			})
			.then(async result => {
				const response = result.data;
				var recordArray = new Array();
				await Promise.all(
					response.map(async row => {
						var height = await t._getHeight(row.width, row.height);
						await recordArray.push({uri: row.recordPicture, height});
					}),
				);
				await t.setState({records: [...this.state.records, ...recordArray]});
			});
	};

	_getHeight = (width, height) => {
		const screenWidth = Dimensions.get('window').width;
		const getHeight = (height * screenWidth * 0.5 - 22) / width;
		return getHeight;
	  }

	_goToPictures = async item => {
		const t = this;
		await axios
			.post('http://13.209.221.206/php/Main/GetRecordPicture.php', {
				recordPicture: item,
			})
			.then(function(response) {
				const recordNo = response.data.message.recordNo;
				t.props.navigation.navigate('RecordPictures', {
					recordNo,
				});
			});
	};
	_onSwipeRight = () => {
		this.props.navigation.goBack();
	}
}

export default Container;
