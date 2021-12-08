import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

// Query and Mutation
import {CREATE_ENTRY} from '../graphql/mutations';
import {ALL_ENTRIES} from '../graphql/queries'
import {useMutation} from '@apollo/client'

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import TextInputField from '../components/TextInputField';
import DateTimeInputField from '../components/DateTimeInputField';
import EquipmentModal from '../components/EquipmentModal';
import FishModal from '../components/FishModal';

export default function CreateEntryScreen({route}) {
    
    const navigation = useNavigation();
    const {store} = route.params;

    // Default states for all the new object's properties
    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
    const [location, setLocation] = useState('');
    const [temperature, setTemperature] = useState('');
    const [iconName, setIconName] = useState('cloud');
    const [weather, setWeather] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [fish, setFish] = useState([]);
    const [otherInfo, setOtherInfo] = useState('');
    const [image, setImage] = useState(null);

    const [isEquipmentModalVisible, setEquipmentModalVisibility] = useState(false);
    const [isFishModalVisible, setFishModalVisibility] = useState(false);

    // After new entry is saved to DB, update HomeScreen entrylist
    const [createEntry, result] = useMutation(CREATE_ENTRY, {
        refetchQueries: [{query: ALL_ENTRIES}],
    });

    useEffect(() => {    
        if (result.data) {      
            createEntryHandler(result.data.createEntry.id);
        }
    }, [result.data])

    const createEntryHandler = (ID) => {
		const entry = {
            ID: ID,
            date: date.format(), 
            time: time.format(), 
            location: location, 
            temperature: temperature,
            iconName: iconName,
            weather: weather,
            equipment: equipment,
            fish: fish,
            otherInfo: otherInfo,
            image: image
        };
		store.createEntry(entry);
		navigation.navigate('HomeScreen', {store});
	};

    const deleteEquipment = (e) => {
        setEquipment(equipment.filter(item => JSON.stringify(item) !== JSON.stringify(e)));
    };

    const deleteFish = (f) => {
        setFish(fish.filter(item => JSON.stringify(item) !== JSON.stringify(f)));
    };

    // Changes the icon whenever the weather is changed
    useEffect(() => {
        if (weather === 'Aurinkoista') {
            setIconName('sun')
        }
        else if (weather === 'Pilvistä') {
            setIconName('cloud')
        }
        else if (weather === 'Vesisadetta') {
            setIconName('cloud-rain')
        }
        else if (weather === 'Lumisadetta') {
            setIconName('snowflake')
        }
        else if (weather === 'Tuulista') {
            setIconName('wind')
        }
    }, [weather]);

    // Saves entry to DB and runs createEntryHandler
    const saveEntryHandler = async () => {
        await createEntry({
            variables: { 
                date, 
                time,
                location, 
                temperature, 
                weather, 
            }
        });
    };

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
                            maxLength: 3,
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
                            <Picker.Item label='Sää' value='placeholder' enabled={false} style={{color: 'silver', fontSize: 14}} />
                            <Picker.Item label='Aurinkoista' value='Aurinkoista' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Pilvistä' value='Pilvistä' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Vesisadetta' value='Vesisadetta' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Lumisadetta' value='Lumisadetta' style={{color: '#34344A', fontSize: 14}} />
                            <Picker.Item label='Tuulista' value='Tuulista' style={{color: '#34344A', fontSize: 14}} />
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

                <ButtonWithIcon title={'Tallenna'} icon={'check'} onPress={() => saveEntryHandler()} />

                <ButtonWithIcon title={'Peruuta'} onPress={() => navigation.goBack()} />

                <View style={{marginBottom: 30}}></View>

            </ScrollView>

            {/* Bottom navigation */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <FontAwesome5 name={'home'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('AllEntriesScreen')}>
                    <FontAwesome5 name={'fish'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('ProfileScreen')}>
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
        height: 60, 
        width: '100%',
    },
    navigationButton: {
        backgroundColor: '#EC0868', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '33%',
    },
});
