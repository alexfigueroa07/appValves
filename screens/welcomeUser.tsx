import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const WelcomeUser = ({ navigation }: { navigation: any }) => {
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                const data = storedData ? JSON.parse(storedData) : {};
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data from AsyncStorage:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleStartWorking = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/images/LOGO alert h2oiso.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Información del usuario */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.companyName}>{userData.companyName || 'Nombre de Empresa'}</Text>
                <Text style={styles.companyAddress}>{userData.companyAddress || 'Dirección de la Empresa'}</Text>
                <Text style={styles.greeting}>¡Bienvenido, {userData.name || 'Nombre de Usuario'}!</Text>
            </View>

            {/* Slogan */}
            <Text style={styles.slogan}>¿Cómo podemos ayudarte hoy?</Text>

            {/* Botones */}
            <TouchableOpacity style={[styles.button, styles.greyButton]} onPress={handleStartWorking}>
                <Text style={styles.buttonText}>Empezar a Trabajar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={() => navigation.navigate('EditInformation')}>
                <Text style={styles.buttonText}>Editar mi información</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco
        alignItems: 'center',
    },
    logo: {
        marginTop: 200,

        width: 200,
        height: 100,
        marginBottom: 20,
    },
    slogan: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#737373', // Gris oscuro
        textAlign: 'center',
        marginBottom: 20,
    },
    userInfoContainer: {
        backgroundColor: '#F5F5F5', // Gris muy claro
        borderRadius: 10,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000', // Sombra sutil
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
    },
    companyName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#424242', // Gris oscuro
        textAlign: 'center',
        marginBottom: 8,
    },
    companyAddress: {
        fontSize: 14,
        color: '#737373', // Gris más claro
        textAlign: 'center',
        marginBottom: 8,
    },
    greeting: {
        fontSize: 16,
        color: '#04BFBF', // Azul principal
        textAlign: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 10, // Menor espacio entre botones
    },
    greyButton: {
        backgroundColor: '#424242', // Botón principal en gris oscuro
    },
    blueButton: {
        backgroundColor: '#04BFBF', // Botón secundario en azul
    },
    buttonText: {
        color: '#FFFFFF', // Texto blanco
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeUser;
