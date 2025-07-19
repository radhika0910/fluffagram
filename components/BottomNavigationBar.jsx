// Path: components\BottomNavigationBar.jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BottomNavigationBar = () => {
    return (
        <View style={styles.container}>
            <Text>Bottom Navigation Bar</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#e7e7e7',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavigationBar;