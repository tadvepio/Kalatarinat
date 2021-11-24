import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';
import {FontAwesome5, AntDesign} from '@expo/vector-icons';

import TextInputField from '../components/TextInputField';

export default function FishModal({isModalVisible, closeModal, fish, setFish}) {

    const [fishName, setFishName] = useState('');
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');

    const addFish = (item) => {
        setFish(fish.concat(item));
    };

    return (
        <Modal visible={isModalVisible} transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <FontAwesome5 name={'times'} size={25} color={'#EC0868'} style={styles.closeIcon} onPress={() => {setFishName(''); setWeight(''); setLength(''); closeModal();}} />
                    <Text style={styles.title}>Lisää kala</Text>

                    <View style={{paddingHorizontal: 35}}>
                        <TextInputField 
                            icon={'fish'} 
                            textInputProps={{
                                placeholder: 'Kalalaji',
                                maxLength: 45,
                                value: fishName,
                                onChangeText: setFishName,
                            }}        
                        />
                    </View>

                    <Text style={styles.text}>Lisää halutessasi kalan paino ja mitta</Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{width: '30%', marginRight: 10}}>
                            <TextInputField 
                                textInputProps={{
                                    keyboardType: 'numeric',
                                    placeholder: 'paino kg',
                                    maxLength: 5,
                                    value: weight,
                                    onChangeText: setWeight,
                                }}        
                            />
                        </View>
                        <View style={{width: '30%', marginLeft: 10}}>
                            <TextInputField 
                                textInputProps={{
                                    keyboardType: 'numeric',
                                    placeholder: 'Mitta cm',
                                    maxLength: 5,
                                    value: length,
                                    onChangeText: setLength,
                                }}        
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.roundButton} onPress={() => {
                        addFish([{ID: fish.length, fishName: fishName, weight: weight, length: length}]);
                        setFishName('');
                        setWeight('');
                        setLength('');
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
        height: 360, 
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
