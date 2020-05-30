import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';


export default function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    

    useEffect(() => {
        async function loadDevs() {
            const user = await AsyncStorage.getItem('user');
            const response = await api.get('/devs', {
                headers: { user }
            });

            setDevs(response.data);
            console.log(user);
        }
        console.log(devs);

        loadDevs();
    }, []);

    async function handleLike() {
        const user = await AsyncStorage.getItem('user');
        const [target, ...rest] = devs;

        await api.post(`/devs/${target._id}/likes`, null,  {
            headers: { user }
        });

        setDevs(rest);
    }

    async function handleDislike() {
        const user = await AsyncStorage.getItem('user');
        const [target, ...rest] = devs;

        await api.post(`/devs/${target._id}/dislikes`, null, {
            headers: { user }
        });

        setDevs(rest);
    }

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logoImg} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                {
                    devs.length === 0 ? <Text style={styles.empty}>Acabou :(</Text> : (
                        devs.map((dev, index) => (
                            <View key={dev._id} style={[styles.card, { zIndex: devs.length - index }]}>
                                <Image style={styles.avatar} source={{ uri: dev.avatar }} />
        
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{dev.name}</Text>
                                    <Text numberOfLines={3} style={styles.bio}>{dev.bio}</Text>
                                </View>
                            </View>
                        ))
                    )
                }
            </View>
           {
               devs.length > 0 ? (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleLike} style={styles.button}>
                        <Image source={like} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDislike} style={styles.button}>
                        <Image source={dislike} />
                    </TouchableOpacity>
            </View>
               ) : <View  />
           }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    logo: {
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight + 40 : 40
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        alignItems: 'center',
        justifyContent: 'center'
    },

    empty: {
        color: '#999',
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold'
    }

})