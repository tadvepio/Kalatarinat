import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import moment from 'moment/min/moment-with-locales';

export default function DateTimeInputField({date, setDate, mode}) {

	const dateDisplayFormat = 'DD.MM.YYYY';
	const dateFormat = 'YYYY-MM-DD';
	const timeFormat = 'HH:mm';

	const [dateModalVisible, setDateModalVisible] = useState(false);
	const [timeModalVisible, setTimeModalVisible] = useState(false);

	const handleDatePicker = (pickedDate) => {
		setDateModalVisible(false);
		let newDate = moment(moment(pickedDate).format(dateFormat) + ' ' + date.format(timeFormat));
		setDate(newDate);
	};

	const handleTimePicker = (pickedDate) => {
		setTimeModalVisible(false);
		let newDate = moment(moment(pickedDate).format('YYYY-MM-DD HH:mm'));
		setDate(newDate);
	};

	return (
        <View>
            {mode === 'date' ?
                <View style={styles.container}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setDateModalVisible(true)}>
                        <FontAwesome5 name={'calendar-alt'} size={22} color={'#EC0868'}/>
                        <Text style={styles.text}>{date.clone().format(dateDisplayFormat)}</Text>
                    </TouchableOpacity>               
                </View>
            :
                <View style={styles.container}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setTimeModalVisible(true)}>
                        <FontAwesome5 name={'clock'} size={22} color={'#EC0868'}/>
                        <Text style={styles.text}>{date.clone().format(timeFormat)}</Text>
                    </TouchableOpacity>
                </View>
            }

            <DateTimePickerModal
                isVisible={dateModalVisible}
                locale={'fi'}
                mode={'date'}
                date={new Date(date.clone().toDate())}
                onConfirm={handleDatePicker}
                onCancel={() => setDateModalVisible(false)}
            />

            <DateTimePickerModal
                isVisible={timeModalVisible}
                locale={'fi'}
                mode={'time'}
                date={new Date(date.clone().toDate())}				
                onConfirm={handleTimePicker}
                onCancel={() => setTimeModalVisible(false)}
            />
        </View>
	)
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EC0868',
	},
	dateTimeButton: {
		flexDirection: 'row',
        width: '100%',
	},
    text: {
        alignSelf: 'center',
        marginHorizontal: 10, 
        fontSize: 14, 
        color: '#34344A', 
    },
});
