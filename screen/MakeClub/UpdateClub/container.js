import React from 'react';
import {Alert} from 'react-native';
import UpdateClub from './presenter';
import * as axios from 'axios';

export default class ClubModify extends React.Component {
	state = {open: false};
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
	}
	render() {
		return (
			<UpdateClub
				{...this.props}
				gotoSignUp={this._gotoSignUp}
				gotoChar={this._gotoChar}
				gotoRecord={this._gotoRecord}
				onPressDeleteClub={this._onPressDeleteClub}
			/>
		);
	}

	_handleBackButtonClick = () => {
		this.props.navigation.goBack();
		return true;
	};

	_gotoSignUp = () => {
		const {navigation} = this.props;
		var userNo = navigation.getParam('userNo', 'NO-ID');

		this.props.navigation.navigate('MakeClub', {
			userNo: userNo,
			from: 'm',
		});
	};

	_gotoChar = () => {
		const {navigation} = this.props;
		var userNo = navigation.getParam('userNo', 'NO-ID');

		this.props.navigation.navigate('MakeChars', {
			userNo: userNo,
			from: 'm',
		});
	};

	_gotoRecord = () => {
		const {navigation} = this.props;
		var userNo = navigation.getParam('userNo', 'NO-ID');

		this.props.navigation.navigate('MakeRecord', {
			userNo: userNo,
			from: 'm',
		});
	};

	_onPressDeleteClub = () => {
		Alert.alert(
			'정말 모임을 삭제하시겠습니까?',
			'',
			[
				{
					text: '아니요',
					onPress: () => console.log('OK Pressed'),
				},
				{text: '네', onPress: () => this._deleteClub()},
			],
			{cancelable: false},
		);
	};

	_deleteClub = () => {
		const {navigation} = this.props;
		var userNo = navigation.getParam('userNo', 'NO-ID');
		axios
			.post('http://13.209.221.206/php/MakeClub/DeleteClub.php', {
				userNo,
			})
			.then(this.props.navigation.navigate('Club', {
        from: 'updateClub'
      }));
	};
}
