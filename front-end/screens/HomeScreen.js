import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { useQuery } from "@apollo/react-hooks";
import { ALL_ENTRIES } from '../graphql/queries'

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();
    const [ entries, setEntries ] = useState(['testi'])
    
    const result1 = useQuery(ALL_ENTRIES);

    useEffect(() => {
        if (result1.data) {
            setEntries(result1.data.allEntries);
        }
    }, [result1])

    console.log(entries)

    return (
        <View style={styles.container}>
            <Box>
                <Text>tähän tulee sää widgetti</Text>
            </Box>

            <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'camerao'} />

            <Text style={styles.text}>Viimeisimmät merkinnät</Text>

            <Box>
                {entries.map(entry => {
                    return (
                        <Text key={entry.date}>
                            Päivämäärä: {entry.date} {"\n"}
                            Aloitusaika: {entry.startTime} {"\n"}
                            Lopetusaika: {entry.endTime} {"\n"}
                            {/* Välineet: {entry.equipment[0]} */}
                            {/* Saalis: {entry.catchedFish[0]} */}
                            Sää: {entry.weather} {"\n"}
                            {"----------------"}
                        </Text>
                    )
                })
                }
            </Box>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    text: {
        marginTop: 40,
        marginLeft: 20,
        color: '#34344A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
