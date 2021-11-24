import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';
import {FontAwesome5, AntDesign} from '@expo/vector-icons';
import {RadioButton} from 'react-native-paper';

import TextInputField from '../components/TextInputField';

export default function EquipmentModal({isModalVisible, closeModal, equipment, setEquipment}) {

    const [checked, setChecked] = useState('Vapa');
    const [modelName, setModelName] = useState('');

    const addEquipment = (item) => {
        setEquipment(equipment.concat(item));
    };

    return (
        <Modal visible={isModalVisible} transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <FontAwesome5 name={'times'} size={25} color={'#EC0868'} style={styles.closeIcon} onPress={() => {setChecked('Vapa'); setModelName(''); closeModal();}} />
                    <Text style={styles.title}>Lisää uusi väline</Text>

                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            value='Vapa'
                            color='#C200FB'
                            status={checked === 'Vapa' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Vapa')}
                        />
                        <Text style={{fontSize: 14, color: '#34344A'}}>Vapa </Text>
                    </View>

                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            value='Viehe'
                            color='#C200FB'
                            status={checked === 'Viehe' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Viehe')}
                        />
                        <Text style={{fontSize: 14, color: '#34344A'}}>Viehe</Text>
                    </View>

                    <Text style={styles.text}>Lisää halutessasi mallin nimi</Text>
                    <View style={{paddingHorizontal: 35}}>
                        <TextInputField 
                            icon={'edit'} 
                            textInputProps={{
                                placeholder: 'Mallin nimi',
                                maxLength: 45,
                                value: modelName,
                                onChangeText: setModelName,
                            }}        
                        />
                    </View>

                    <TouchableOpacity style={styles.roundButton} onPress={() => {
                        addEquipment([{ID: equipment.length, type: checked, modelName: modelName}]);
                        setChecked('Vapa');
                        setModelName('');
                        closeModal();
                    }}>
                        <AntDesign name={'check'} size={25} color={'#ffffff'} style={{padding: 10}} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        width: '100%', 
        height: '100%',
    },
    container: {
        backgroundColor: '#ffffff', 
        width: '90%', 
        height: 380, 
        borderRadius: 20, 
        alignSelf: 'center', 
        marginTop: 70,
    },
    closeIcon: {
        alignSelf: 'flex-end', 
        marginRight: 20, 
        marginTop: 20,
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#34344A', 
        alignSelf: 'center', 
        marginBottom: 20,
    },
    radioButtonContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        fontSize: 14, 
        color: '#34344A', 
        alignSelf: 'center', 
        marginVertical: 20,
    },
    roundButton: {
        alignSelf: 'center', 
        backgroundColor: '#EC0868', 
        width: 45, 
        borderRadius: 45,
        marginTop: 20,
    },
});
