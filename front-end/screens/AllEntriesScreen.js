import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import moment from 'moment';

import FishStore from '../stores/FishStore';
import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function AllEntriesScreen() {
    
    const navigation = useNavigation();

    const [data, setData] = useState(FishStore.data.slice(0).reverse());

    // Timer to refresh the screen so that the entries are visible
    useEffect(() => {
        const timer = setInterval(() => {
            setData(FishStore.data.slice(0).reverse());
        }, 0.5 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>

                {data.map((object, index) => 
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
                )}

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
    text: {
        marginTop: 20,
        marginBottom: 100,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
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
