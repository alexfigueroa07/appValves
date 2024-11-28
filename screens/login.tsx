import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const Login = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            const userData = storedData ? JSON.parse(storedData) : null;

            if (userData && userData.username === username && userData.password === password) {
                Alert.alert('Inicio de sesión exitoso');
                navigation.navigate('Home'); // Cambia 'Home' al nombre de tu pantalla de inicio
            } else {
                Alert.alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error("Error al acceder a los datos de usuario:", error);
            Alert.alert('Error', 'No se pudo acceder a los datos de inicio de sesión');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/LOGO alert h2oiso.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#B0BEC5"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                placeholderTextColor="#B0BEC5"
            />

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={keepSignedIn}
                    onValueChange={setKeepSignedIn}
                    color="#04BFBF"
                />
                <Text style={styles.checkboxLabel}>Mantener sesión iniciada</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                <Text onPress={() => alert('Función de recuperación de contraseña no implementada')} style={styles.link}>
                    Olvidé mi contraseña
                </Text>
                {'  '}|{'  '}
                <Text onPress={() => alert('Función de problemas con la cuenta no implementada')} style={styles.link}>
                    Problemas con la cuenta
                </Text>
            </Text>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 206,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#04BFBF',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#737373',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#424242',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: '#424242',
    },
    button: {
        backgroundColor: '#04BFBF',
        paddingVertical: 15,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 12,
        color: '#424242',
        textAlign: 'center',
    },
    link: {
        color: '#04BFBF',
        textDecorationLine: 'underline',
    },
});
