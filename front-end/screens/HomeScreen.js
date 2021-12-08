import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/fi';
import {FontAwesome5} from '@expo/vector-icons';

import {useQuery} from '@apollo/react-hooks';
import {ALL_ENTRIES} from '../graphql/queries'

import FishStore from '../stores/FishStore';
import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();
    const [data, setData] = useState(FishStore.data.slice(0).reverse());
    const [entries, setEntries] = useState([]);

    const currentDay = moment().locale('fi').format('DD. MMMM');
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

    // Queries entries at the start of the application 
    const result1 = useQuery(ALL_ENTRIES);

    // Sets queried data to entries state
    useEffect(() => {
        if (result1.data) {
            setEntries(result1.data.allEntries);
        }
    }, [result1])

    useEffect(() => {
        Alert.alert('Tänään näyttäisi olevan oivalliset olosuhteet kalojen narraamiselle.')
    }, [])

    // Timer to refresh the screen so that the entries are visible
    useEffect(() => {
        const timer = setInterval(() => {
            setData(FishStore.data.slice(0).reverse());
            setCurrentTime(moment().format('HH:mm'));
        }, 0.5 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (            
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                          
                <Box>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <View style={styles.timeContainer}>
                            <Text style={{fontSize: 36, color: '#34344A', marginBottom: 5}}>{currentTime}</Text>
                            <Text style={{fontSize: 18, color: '#34344A'}}>{currentDay}ta</Text>
                        </View>

                        <View style={styles.weatherContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                <FontAwesome5 name={'sun'} size={25} color={'#ffcc00'} />
                                <Text style={{fontSize: 18, color: '#34344A', marginLeft: 5}}>15°C</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome5 name={'map-marker-alt'} size={22} color={'#34344A'} />
                                <Text style={{fontSize: 18, color: '#34344A', marginLeft: 5}}>Turku</Text>
                            </View>
                        </View>
                    </View>
                </Box>

                <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'plus'} onPress={() => navigation.navigate('CreateEntryScreen', {store: FishStore, setEntries: setEntries})} />

                <Text style={styles.text}>Viimeisimmät merkinnät</Text>
               
                {/* Displays the latest entries */}
                {data.map((object, index) => {
                    if (index === 0 || index === 1 || index === 2) {
                        return (
                            <Box key={index}>
                                <View style={styles.entryProperty}>
                                    <FontAwesome5 name={'calendar-alt'} size={22} color={'#EC0868'} />
                                    <Text style={styles.entryPropertyText}>{moment(object.date).format('DD.MM.YYYY')}</Text>
                                    <View style={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome5 name={'clock'} size={22} color={'#EC0868'} />
                                        <Text style={styles.entryPropertyText}>{moment(object.time).format('HH:mm')}</Text>
                                    </View>
                                </View>
                                <View style={styles.entryProperty}>
                                    <FontAwesome5 name={'map-marker-alt'} size={22} color={'#EC0868'} />
                                    <Text style={styles.entryPropertyText}>{object.location}</Text>
                                </View>
                                <View style={styles.entryProperty}>
                                    <FontAwesome5 name={object.iconName} size={22} color={'#EC0868'} />
                                    <Text style={styles.entryPropertyText}>{object.weather}</Text>
                                    <View style={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome5 name={'temperature-high'} size={22} color={'#EC0868'} />
                                        <Text style={styles.entryPropertyText}>{object.temperature}°C</Text>
                                    </View>
                                </View>
                                <ButtonWithIcon title={'Tarkastele'} icon={'eyeo'} onPress={() => navigation.navigate('ModifyEntryScreen', {store: FishStore, object: object})} />
                            </Box>
                    )} else return null;
                })}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 250,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: -20,
    },
    timeContainer: {
        width: '50%',
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#C200FB',
    },
    weatherContainer: {
        width: '50%',
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#C200FB',
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    entryProperty: {
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
    entryPropertyText: {
        fontSize: 14, 
        color: '#34344A', 
        marginHorizontal: 10,
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
