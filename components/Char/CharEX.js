import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class CharEX extends Component {
	static defaultProps = {
		title: 'untitled',
		buttonColor: '#28E7FF',
		onPress: () => null,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.button}>
				<Text style={[styles.title]}>{this.props.title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: height*0.02,
		borderRadius:  height*0.055*0.5,
		height: height*0.055,
		backgroundColor: '#fff',
		paddingHorizontal:width*0.03,
		
		marginRight: 10,
		borderColor: '#DADADA',
		borderWidth: 1,
	},
	title: {
		fontSize: width*0.04,
		color: '#BBBBBB',
	},
});
