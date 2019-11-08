import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text, StyleSheet, View } from 'react-native';

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
				<Text style={[styles.title]}># {this.props.char}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor:'#7B99B6',
		borderRadius:5,
		alignItems: 'center',
		justifyContent: 'center',

		paddingVertical:width*0.01,
		paddingHorizontal:width*0.04,
		margin:width*0.01,
		alignItems: 'center'
	},
	title: {
		fontSize: height*0.02,
		color: 'white',
	},
});
