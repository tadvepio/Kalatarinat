import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import { useQuery } from "@apollo/react-hooks";
import { ALL_ENTRIES } from '../graphql/queries'

import FishStore from '../stores/FishStore';
import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();
    const [data, setData] = useState(FishStore.data);
    const [ entries, setEntries ] = useState(['testi'])

    //Queries entries at the start of the application 
    const result1 = useQuery(ALL_ENTRIES);

    //Sets queried data to entries state
    useEffect(() => {
        if (result1.data) {
            setEntries(result1.data.allEntries);
        }
    }, [result1])

    // console.log(entries)

    // Timer to refresh the screen so that the entries are visible
    useEffect(() => {
        const timer = setInterval(() => {
            setData(FishStore.data);
        }, 0.5 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (            
        <View style={styles.container}>
            <ScrollView>
                <Image
                  style={styles.logoStyle} 
                  source={require('../assets/logo.png')}
                />
                          
                <Box>
                    <Text>tähän tulee sää widgetti</Text>
                </Box>

                <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'plus'} onPress={() => navigation.navigate('CreateEntryScreen', {store: FishStore, setEntries: setEntries})} />

                <Text style={styles.text}>Viimeisimmät merkinnät</Text>
               
                {/* Map the entries to the screen from the store, this current version is for testing purposes and will be changed */}
                {data.map((object, index) => 
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('ModifyEntryScreen', {store: FishStore, object: object})}>
                        <Box>
                            <Text>{object.ID}</Text>
                        </Box>
                    </TouchableOpacity>
                )}
                
                <Box>
                  {/* <Text>kala</Text> */}
                  {/* Displays queried data */}
                  {entries.map(entry => {
                    return (
                        <Text key={entry.date}>
                            Päivämäärä: {entry.date} {"\n"}
                            Aloitusaika: {entry.time} {"\n"}
                            Sijainti: {entry.location} {"\n"}
                            Lämpötila: {entry.temperature} °C {"\n"}
                            Sää: {entry.weather} {"\n"}
                            {"----------------"}
                        </Text>
                    )
                    })
                  }
                  <ButtonWithIcon 
                    title={'Tarkastele'} 
                    icon={'eyeo'} 
                  />
                </Box>
                <Box>
                    <Text>kala</Text>
                </Box>
                <Box>
                    <Text>kala</Text>
                </Box>
                <Box>
                    <Text>kala</Text>
                </Box>
                <Box>
                    <Text>kala</Text>
                </Box>

            </ScrollView>

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
    logoStyle: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    boxContainer: {
        marginTop: 50,
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
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
    }
});
