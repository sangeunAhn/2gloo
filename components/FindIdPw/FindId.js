import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Dimensions, Text, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import ConfirmButton from '../../components/Button/ConfirmButton';


const { width, height } = Dimensions.get('window');

const Login = props => (
	<View style={styles.container}>

		<TextField
						title="가입할때 작성한 이메일을 입력해주세요."
						titleFontSize={height*0.015}
						label="이메일"
						labelFontSize={height*0.018}
						returnKeyType={'done'}
						autoCorrect={false}
						autoCapitalize={'none'}
						value={props.idEmail}
						multiline={false}
						onChangeText={props.idEmailChange}
						fontSize={height*0.023}
					/>
					<View style={{alignItems:'center', marginTop:height*0.15}}>
					<ConfirmButton title={'확인'} onPress={props.idConfirmBtn} />
					</View>
		
	</View>
);

const styles = StyleSheet.create({
	container: {
		
	},
});

export default Login;
