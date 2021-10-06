import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Box({children}) {

    return (
        <View style={styles.container}>
            <View style={styles.shadow}>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 20,
    },
    shadow: {
        borderRadius: 25,
        backgroundColor: '#34344A',
        width: '100%',
        height: 'auto',
        paddingBottom: '1.5%',
        paddingRight: '1.5%',
        alignSelf: 'center',
    },
    content: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#C200FB',
        padding: 20,
        backgroundColor: '#ffffff',
    },
});