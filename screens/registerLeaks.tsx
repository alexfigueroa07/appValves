import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterLeaks = ({ navigation }: any) => {
    const [leakFrequency, setLeakFrequency] = useState('');
    const [leakSeverity, setLeakSeverity] = useState('');
    const [timeSinceLastLeak, setTimeSinceLastLeak] = useState('');
    const [leakResolutionMethods, setLeakResolutionMethods] = useState('');
    const [effectivenessMonitoring, setEffectivenessMonitoring] = useState('');
    const [persistentLeakArea, setPersistentLeakArea] = useState('');
    const [detectionTime, setDetectionTime] = useState('');
    const [waterWasteAmount, setWaterWasteAmount] = useState('');

    const handleSubmit = async () => {
        const leaksData = {
            leakFrequency,
            leakSeverity,
            timeSinceLastLeak,
            leakResolutionMethods,
            effectivenessMonitoring,
            persistentLeakArea,
            detectionTime,
            waterWasteAmount,
        };

        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            const userData = storedUserData ? JSON.parse(storedUserData) : {};

            const combinedData = { ...userData, ...leaksData };

            await AsyncStorage.setItem('userData', JSON.stringify(combinedData));
            Alert.alert('Datos guardados', 'Historial de fugas registrado exitosamente.');
            navigation.navigate('WelcomeUser'); // Navega a la siguiente pantalla
        } catch (e) {
            console.error('Error al guardar historial de fugas:', e);
            Alert.alert('Error', 'No se pudo guardar la información del historial de fugas');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Historial de Fugas</Text>

            <Text style={styles.label}>¿Con qué frecuencia se detectan fugas?</Text>
            <Picker
                selectedValue={leakFrequency}
                onValueChange={(itemValue) => setLeakFrequency(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Mensualmente" value="Mensualmente" />
                <Picker.Item label="Cada seis meses" value="Cada seis meses" />
                <Picker.Item label="Anualmente" value="Anualmente" />
                <Picker.Item label="Menos de una vez al año" value="Menos de una vez al año" />
            </Picker>

            <Text style={styles.label}>¿Cuál es la gravedad de las fugas?</Text>
            <Picker
                selectedValue={leakSeverity}
                onValueChange={(itemValue) => setLeakSeverity(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Menor" value="Menor" />
                <Picker.Item label="Moderada" value="Moderada" />
                <Picker.Item label="Grave" value="Grave" />
            </Picker>

            <Text style={styles.label}>¿Hace cuánto se detectó la última fuga?</Text>
            <Picker
                selectedValue={timeSinceLastLeak}
                onValueChange={(itemValue) => setTimeSinceLastLeak(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Menos de un mes" value="Menos de un mes" />
                <Picker.Item label="1-3 meses" value="1-3 meses" />
                <Picker.Item label="Más de 3 meses" value="Más de 3 meses" />
            </Picker>

            <Text style={styles.label}>¿Cómo se solucionan las fugas?</Text>
            <Picker
                selectedValue={leakResolutionMethods}
                onValueChange={(itemValue) => setLeakResolutionMethods(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Reparación interna" value="Reparación interna" />
                <Picker.Item label="Contratar servicio externo" value="Contratar servicio externo" />
                <Picker.Item label="Ambos" value="Ambos" />
            </Picker>

            <Text style={styles.label}>¿Cómo se monitorea la efectividad?</Text>
            <Picker
                selectedValue={effectivenessMonitoring}
                onValueChange={(itemValue) => setEffectivenessMonitoring(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Inspecciones visuales" value="Inspecciones visuales" />
                <Picker.Item label="Mediciones constantes" value="Mediciones constantes" />
                <Picker.Item label="No se monitorea" value="No se monitorea" />
            </Picker>

            <Text style={styles.label}>¿Cuánto tiempo toma detectar las fugas?</Text>
            <Picker
                selectedValue={detectionTime}
                onValueChange={(itemValue) => setDetectionTime(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Inmediatamente" value="Inmediatamente" />
                <Picker.Item label="1-3 días" value="1-3 días" />
                <Picker.Item label="Más de una semana" value="Más de una semana" />
            </Picker>

            <Text style={styles.label}>¿Cuánta agua se desperdicia?</Text>
            <Picker
                selectedValue={waterWasteAmount}
                onValueChange={(itemValue) => setWaterWasteAmount(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Menos de 100 litros" value="Menos de 100 litros" />
                <Picker.Item label="100-500 litros" value="100-500 litros" />
                <Picker.Item label="Más de 500 litros" value="Más de 500 litros" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

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
        fontWeight: 'bold',
        color: '#04BFBF',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#04BFBF',
        marginBottom: 8,
    },
    picker: {
        width: '100%',
        height: 50,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
        color: '#424242',
    },
    button: {
        backgroundColor: '#04BFBF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterLeaks;
