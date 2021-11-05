import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default function TextInputField({icon, textInputProps }) {
    
	return (
		<View style={styles.container}>
			{icon && <FontAwesome5 name={icon} size={22} color={'#EC0868'} />}
			<TextInput
				style={{width: '100%', fontSize: 14, color: '#34344A', marginHorizontal: 10}}
				{...textInputProps}
			/>
		</View>
	)
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EC0868',
    },
});
