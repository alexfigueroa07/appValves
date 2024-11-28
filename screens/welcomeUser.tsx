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

    // Function to navigate to home screen
    const handleStartWorking = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo at the top */}
            <Image
                source={require('../assets/images/LOGO alert h2oiso.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Company Name and Greeting */}
            <View style={styles.companyContainer}>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{userData.companyName || 'Nombre de Empresa'}</Text>
                    <Text style={styles.companyAddress}>{userData.companyAddress || 'Dirección de la Empresa'}</Text>
                    <Text style={styles.greeting}>¡Bienvenido, {userData.name || 'Nombre de Usuario'}!</Text>
                </View>
            </View>
            <Text style={styles.slogan}>¿Cómo podemos ayudarte hoy?</Text>

            {/* Start Working Button */}
            <TouchableOpacity style={styles.startButton} onPress={handleStartWorking}>
                <Text style={styles.buttonText}>Empezar a Trabajar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('EditInformation')}>
                <Text style={styles.buttonText}>Editar mi información</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 3,
    },
    alertTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 8,
        textAlign: 'center',
    },
    slogan: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#1E88E5',
        textAlign: 'center',
        marginBottom: 10,
    },
    companyContainer: {
        backgroundColor: '#D8F0F2', // Light blue transparent background
        borderRadius: 10,
        padding: 20,
        marginBottom: 40,
    },
    companyInfo: {
        alignItems: 'center',
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E88E5',
        textAlign: 'center',
    },
    companyAddress: {
        fontSize: 16,
        color: '#1E88E5',
        textAlign: 'center',
        marginBottom: 16,
    },
    greeting: {
        fontSize: 18,
        color: '#4BA69D',
        textAlign: 'center',
        marginBottom: 40,
    },
    startButton: {
        backgroundColor: '#4BA69D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WelcomeUser;
