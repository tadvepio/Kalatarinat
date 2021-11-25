import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import { DELETE_ENTRY, MODIFY_ENTRY } from '../graphql/mutations';
import { ALL_ENTRIES } from '../graphql/queries'
import { useMutation } from '@apollo/client'

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import TextInputField from '../components/TextInputField';
import DateTimeInputField from '../components/DateTimeInputField';
import EquipmentModal from '../components/EquipmentModal';
import FishModal from '../components/FishModal';

export default function ModifyEntryScreen({route}) {
    
    const navigation = useNavigation();
    const {store, object} = route.params;

    const ID = object.ID;
    const [date, setDate] = useState(moment(object.date));
    const [time, setTime] = useState(moment(object.time));
    const [location, setLocation] = useState(object.location);
    const [temperature, setTemperature] = useState(object.temperature);
    const [weather, setWeather] = useState(object.weather);
    const [equipment, setEquipment] = useState(object.equipment);
    const [fish, setFish] = useState(object.fish);
    const [otherInfo, setOtherInfo] = useState(object.otherInfo);
    const [image, setImage] = useState(object.image);

    const [iconName, setIconName] = useState('cloud');

    const [isEquipmentModalVisible, setEquipmentModalVisibility] = useState(false);
    const [isFishModalVisible, setFishModalVisibility] = useState(false);

    // After entry is deleted from DB, update HomeScreen entrylist
    const [ deleteEntry ] = useMutation(DELETE_ENTRY, {
        refetchQueries: [ { query: ALL_ENTRIES } ],
    })

    // After entry modified, update HomeScreen entrylist
    const [ modifyEntry ] = useMutation(MODIFY_ENTRY, {
        refetchQueries: [ { query: ALL_ENTRIES } ],
    })


    const modifyEntryHandler = () => {
		const entry = {
            ID: ID,
            date: date.format(), 
            time: time.format(), 
            location: location, 
            temperature: temperature,
            weather: weather,
            equipment: equipment,
            fish: fish,
            otherInfo: otherInfo,
            image: image
        };
		store.modifyEntry(entry);
        modifyEntry({ 
            variables: {
                id: ID,
                date: date,
                time: time,
                location: location,
                temperature: temperature,
                weather: weather
            }
        })
		navigation.navigate('HomeScreen', {store, object});
	};

    const deleteEntryHandler = () => {
		store.deleteEntry(object);
        console.log(ID)
        deleteEntry({ variables: {id: ID} })
		navigation.navigate('HomeScreen', {store, object});
	};

    const deleteEquipment = (e) => {
        setEquipment(equipment.filter(item => JSON.stringify(item) !== JSON.stringify(e)));
    };

    const deleteFish = (f) => {
        setFish(fish.filter(item => JSON.stringify(item) !== JSON.stringify(f)));
    };

    // Changes the icon whenever the weather is changed
    useEffect(() => {
        if (weather === 'sun') {
            setIconName('sun')
        }
        else if (weather === 'cloud') {
            setIconName('cloud')
        }
        else if (weather === 'rain') {
            setIconName('cloud-rain')
        }
        else if (weather === 'snow') {
            setIconName('snowflake')
        }
        else if (weather === 'wind') {
            setIconName('wind')
        }
    }, [weather]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Box>
                    <DateTimeInputField date={date} setDate={(date) => setDate(date)} mode={'date'} />

                    <DateTimeInputField date={time} setDate={(time) => setTime(time)} mode={'time'} />

                    <TextInputField 
                        icon={'map-marker-alt'} 
                        textInputProps={{
                            placeholder: 'Sijainti',
                            maxLength: 45,
                            value: location,
                            onChangeText: setLocation,
                        }}        
                    />

                    <TextInputField 
                        icon={'temperature-high'} 
                        textInputProps={{
                            placeholder: 'Lämpötila',
                            maxLength: 2,
                            keyboardType: 'numeric',
                            value: temperature,
                            onChangeText: setTemperature,
                        }}        
                    />

                    <View style={styles.pickerContainer}>
                        <FontAwesome5 name={iconName} size={22} color={'#EC0868'} />
                        <Picker
                            selectedValue={weather}
                            onValueChange={itemValue => setWeather(itemValue)}
                            mode={'dropdown'}
                            dropdownIconColor={'#EC0868'}
                            style={{width: '90%'}}
                        >
                            <Picker.Item label='Sää' value='placeholder' enabled={false} style={{color: 'silver'}} />
                            <Picker.Item label='Aurinkoista' value='sun' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Pilvistä' value='cloud' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Vesisadetta' value='rain' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Lumisadetta' value='snow' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Tuulista' value='wind' style={{color: '#34344A', fontSize: 14}} />
                        </Picker>
                    </View>
                </Box>

                <Text style={styles.text}>Välineet</Text>
                <Box>
                    {equipment.map((item, index) => 
                        <View key={index} style={styles.equipmentItem}>
                            <Text style={{fontSize: 14, color: '#34344A'}}>{item.modelName !== '' ? item.modelName : item.type}</Text>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEquipment(item)}>
                                <AntDesign name={'delete'} size={20} color={'#ffffff'} style={{padding: 5}} />
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={styles.roundButton} onPress={() => setEquipmentModalVisibility(true)}>
                        <AntDesign name={'plus'} size={25} color={'#ffffff'} style={{padding: 10}} />
                    </TouchableOpacity>
                </Box>

                <Text style={styles.text}>Kalat</Text>
                <Box>
                    {fish.map((item, index) => 
                        <View key={index} style={styles.fishItem}>
                            <FontAwesome5 name={'fish'} size={22} color={'#EC0868'} />
                            <View style={{marginLeft: 10}}>
                                <Text style={{fontSize: 14, color: '#34344A'}}>{item.fishName}</Text>
                                <Text style={{fontSize: 14, color: '#34344A'}}>{item.weight !== '' ? item.weight + 'kg' : ''}  {item.length !== '' ? item.length + 'cm' : ''}</Text>
                            </View>
                            
                            <TouchableOpacity style={{...styles.deleteButton, marginLeft: 'auto' }} onPress={() => deleteFish(item)}>
                                <AntDesign name={'delete'} size={20} color={'#ffffff'} style={{padding: 5}} />
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={styles.roundButton} onPress={() => setFishModalVisibility(true)}>
                        <AntDesign name={'plus'} size={25} color={'#ffffff'} style={{padding: 10}} />
                    </TouchableOpacity>
                </Box>

                <Text style={styles.text}>Muuta tietoa</Text>
                <Box>
                    <TextInput 
                        placeholder={'Esim. käytetyt syötit, tarkemmat kalamäärät tai jokin muu tarkentava tieto'}
                        multiline={true}
                        maxLength={250}
                        value={otherInfo}
                        onChangeText={setOtherInfo}
                        style={{height: 100, fontSize: 14, color: '#34344A', textAlignVertical: 'top'}}
                    />
                </Box>

                <ButtonWithIcon title={'Lisää kuva'} icon={'camerao'} />

                <ButtonWithIcon title={'Tallenna'} icon={'check'} onPress={() => modifyEntryHandler()} />

                <ButtonWithIcon title={'Poista'} icon={'delete'} onPress={() => deleteEntryHandler()} />

                <ButtonWithIcon title={'Peruuta'} onPress={() => navigation.goBack()} />

                <View style={{marginBottom: 30}}></View>

            </ScrollView>

            {/* Bottom navigation */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <FontAwesome5 name={'home'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton}>
                    <FontAwesome5 name={'fish'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton}>
                    <FontAwesome5 name={'user'} size={25} color={'#ffffff'} />
                </TouchableOpacity>
            </View>

            <EquipmentModal isModalVisible={isEquipmentModalVisible} closeModal={() => setEquipmentModalVisibility(false)} equipment={equipment} setEquipment={(equipment) => setEquipment(equipment)} />
            <FishModal isModalVisible={isFishModalVisible} closeModal={() => setFishModalVisibility(false)} fish={fish} setFish={(fish) => setFish(fish)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    pickerContainer: {
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
    text: {
        marginTop: 10,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    equipmentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EC0868',
    },
    deleteButton: {
        alignItems: 'center', 
        backgroundColor: '#EC0868', 
        width: 30, 
        borderRadius: 30,
        marginRight: 10,
    },
    fishItem: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EC0868',
    },
    roundButton: {
        alignSelf: 'center', 
        backgroundColor: '#EC0868', 
        width: 45, 
        borderRadius: 45,
    },
    navigationContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        height: 60, width: '100%',
    },
    navigationButton: {
        backgroundColor: '#EC0868', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '33%',
    },
});
