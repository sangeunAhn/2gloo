import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class UpdateClubBtnText extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.content}>
				<View style={styles.title}>
					<Text style={styles.titleText}>{this.props.title}</Text>
				</View>
				<View style={styles.sub}>
					<Text style={styles.subText}>{this.props.sub}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexWrap: 'wrap',
	},
	title: {
		justifyContent: 'center',
	},
	sub: {
		marginLeft: width * 0.007,
		justifyContent: 'center',
	},
	titleText: {
		fontSize: width * 0.07,
		fontWeight: 'bold',
	},
	subText: {
		fontSize: width * 0.032,
		color: '#BBBBBB',
	},
});
