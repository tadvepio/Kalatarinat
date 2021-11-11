import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';
import TextInputField from '../components/TextInputField';
import DateTimeInputField from '../components/DateTimeInputField';

export default function CreateEntryScreen({route}) {
    
    const navigation = useNavigation();
    const {store} = route.params;

    // Default states for all the new object's properties
    const ID = store.data.length;
    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
    const [location, setLocation] = useState('');
    const [temperature, setTeperature] = useState('');
    const [weather, setWeather] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [fish, setFish] = useState([]);
    const [otherInfo, setOtherInfo] = useState('');
    const [image, setImage] = useState(null);

    const createEntryHandler = () => {
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
		store.createEntry(entry);
		navigation.navigate('HomeScreen', {store});
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
                            maxLength: 2,
                            keyboardType: 'numeric',
                            value: temperature,
                            onChangeText: setTeperature,
                        }}        
                    />

                    <TextInputField 
                        icon={'cloud'} 
                        textInputProps={{
                            placeholder: 'Sää',
                        }}        
                    />
                </Box>

                <Text style={styles.text}>Välineet</Text>
                <Box>
                    <TouchableOpacity style={styles.roundButton}>
                        <AntDesign name={'plus'} size={25} color={'#ffffff'} style={{padding: 10}} />
                    </TouchableOpacity>
                </Box>

                <Text style={styles.text}>Kalat</Text>
                <Box>
                    <TouchableOpacity style={styles.roundButton}>
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

                <ButtonWithIcon title={'Tallenna'} icon={'check'} onPress={() => createEntryHandler()} />

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    text: {
        marginTop: 10,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
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