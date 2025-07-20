// Path: app\(tabs)\post.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PostScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Post Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PostScreen;