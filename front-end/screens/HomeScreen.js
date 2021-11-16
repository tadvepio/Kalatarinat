import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Box>
                <Text>tähän tulee sää widgetti</Text>
            </Box>

            <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'camerao'} />

            <Text style={styles.text}>Viimeisimmät merkinnät</Text>

<<<<<<< Updated upstream
            <Box>
                <Text>kala</Text>
            </Box>
=======
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
                        <Box>
                        <Text key={entry.date}>
                            Päivämäärä: {entry.date} {"\n"}
                            Aloitusaika: {entry.time} {"\n"}
                            Sijainti: {entry.location} {"\n"}
                            Lämpötila: {entry.temperature} °C {"\n"}
                            Sää: {entry.weather} {"\n"}
                        </Text>
                        </Box>
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
>>>>>>> Stashed changes

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
