import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function ButtonWithIcon({title, icon, onPress, disabled}) {

	return (
		<TouchableOpacity
			style={styles.button}
			disabled={disabled || false}
			onPress={onPress}
		>
			{icon && <AntDesign name={icon} size={25} color={'#ffffff'} style={{marginRight: 10}} />}
			{title !== '' && <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>{title}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', 
        backgroundColor: '#EC0868', 
        borderRadius: 10, 
        marginHorizontal: 20, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
});
