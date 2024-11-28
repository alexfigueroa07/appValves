import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const WaterRegistered = ({ navigation }: { navigation: any }) => {
    const handleNextStep = () => {
        navigation.navigate('RegisterLeaks');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>¡Registro de Agua Completo!</Text>
            <Image
                source={require('../assets/images/progreso.gif')}
                style={styles.image}
            />
            <Text style={styles.message}>¡Gracias por tu paciencia! Ya solo falta un paso más.</Text>
            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>SIGUIENTE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#04BFBF', // Color principal para el título
        marginBottom: 24,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 24,
    },
    message: {
        fontSize: 16,
        color: '#0D47A1',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#04BFBF', // Color principal del botón
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFFFFF', // Texto blanco en el botón
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WaterRegistered;
