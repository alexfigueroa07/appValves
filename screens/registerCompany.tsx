import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const RegisterCompany = ({ navigation }: any) => {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [employees, setEmployees] = useState('');
    const [website, setWebsite] = useState('');

    const handleRegisterCompany = async () => {
        const companyData = {
            companyName,
            companyAddress,
            registrationNumber,
            companyPhone,
            contactEmail,
            industryType,
            employees,
            website,
        };

        try {
            // Obtener los datos de usuario anteriores, verificando si no son nulos
            const storedUserData = await AsyncStorage.getItem('userData');
            const userData = storedUserData ? JSON.parse(storedUserData) : {};

            const combinedData = { ...userData, ...companyData };

            // Guardar el objeto combinado en AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(combinedData));
            Alert.alert('Datos guardados', 'Empresa registrada con éxito');
            navigation.navigate('RegisterWater'); // Navega a la siguiente pantalla
        } catch (e) {
            console.error('Error al guardar datos de la empresa:', e);
            Alert.alert('Error', 'No se pudo guardar la información de la empresa');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Empresa</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de la empresa"
                placeholderTextColor="#737373"
                value={companyName}
                onChangeText={setCompanyName}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Dirección de la empresa"
                placeholderTextColor="#737373"
                value={companyAddress}
                onChangeText={setCompanyAddress}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Número de registro"
                placeholderTextColor="#737373"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
                autoCapitalize="none"
                keyboardType="default"
            />

            <TextInput
                style={styles.input}
                placeholder="Teléfono de la empresa"
                placeholderTextColor="#737373"
                value={companyPhone}
                onChangeText={setCompanyPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Correo de contacto"
                placeholderTextColor="#737373"
                value={contactEmail}
                onChangeText={setContactEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Tipo de industria"
                placeholderTextColor="#737373"
                value={industryType}
                onChangeText={setIndustryType}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Número de empleados"
                placeholderTextColor="#737373"
                value={employees}
                onChangeText={setEmployees}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Sitio web (opcional)"
                placeholderTextColor="#737373"
                value={website}
                onChangeText={setWebsite}
                autoCapitalize="none"
                keyboardType="url"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegisterCompany}>
                <Text style={styles.buttonText}>SIGUIENTE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RegisterCompany;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#04BFBF', // Color principal para el título
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#B0BEC5', // Gris claro para los bordes
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#424242', // Gris oscuro para el texto
    },
    button: {
        backgroundColor: '#04BFBF', // Color principal del botón
        paddingVertical: 15,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFFFFF', // Texto blanco para el botón
        fontSize: 18,
        fontWeight: 'bold',
    },
});
