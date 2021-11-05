import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FishStore from '../stores/FishStore';
import Box from '../components/Box';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function HomeScreen() {
    
    const navigation = useNavigation();

    const mapEntries = () => {
        let list;
        list = FishStore.data.map((item, index) => 
            <Box key={index}>
                <Text>{item.ID}</Text>
            </Box>
        );

        return (
            <View>
                {[list]}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Box>
                    <Text>tähän tulee sää widgetti</Text>
                </Box>

                <ButtonWithIcon title={'Lisää uusi merkintä'} icon={'plus'} onPress={() => navigation.navigate('CreateEntryScreen')} />

                <Text style={styles.text}>Viimeisimmät merkinnät</Text>

            </ScrollView>
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
