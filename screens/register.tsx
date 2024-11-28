import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const Register = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        const userData = {
            name,
            username,
            email,
            password,
            country,
            state,
            phone,
        };

        try {
            // Guarda los datos en AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('Datos guardados', 'AHORA INGRESA LOS DATOS PRINCIPALES DE TU EMPRESA');
            navigation.navigate('RegisterCompany'); // Navega a la siguiente pantalla
        } catch (e) {
            console.error('Error al guardar datos:', e);
            Alert.alert('Error', 'No se pudo guardar la información');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="#737373"
            />

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#737373"
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#737373"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry
                placeholderTextColor="#737373"
            />

            <TextInput
                style={styles.input}
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                secureTextEntry
                placeholderTextColor="#737373"
            />



            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#04BFBF', // Color principal para el título
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#424242',
    },
    button: {
        backgroundColor: '#04BFBF', // Color principal del botón
        paddingVertical: 15,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFFFFF', // Texto blanco para el botón
        fontSize: 18,
        fontWeight: 'bold',
    },
});
