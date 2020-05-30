import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, Platform, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Main');
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;
        
        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main');
    }

    return(
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios ' }
      style={{ flex: 1 }}

    >
        <View style={styles.container}>
            <Image source={logoImg} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite seu usuário no GitHub" 
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enivar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingHorizontal: 15,
        marginTop: 20
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})