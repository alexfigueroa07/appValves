import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress'; // Librería para la barra de progreso

const RegisterWaterNotes = ({ navigation }: any) => {
    const [waterPotable, setWaterPotable] = useState('No');
    const [potableWaterProvided, setPotableWaterProvided] = useState('');
    const [notesData, setNotesData] = useState({
        currentReading: '',
        previousReading: '',
        litersConsumed: '',
    });
    const [weeklyAverage, setWeeklyAverage] = useState(0);
    const MAX_WEEKLY_CONSUMPTION = 50000; // Consumo máximo estimado por semana (en litros)

    // Calcular litros consumidos y promedio semanal
    useEffect(() => {
        const calculateConsumption = () => {
            const current = parseFloat(notesData.currentReading);
            const previous = parseFloat(notesData.previousReading);

            if (!isNaN(current) && !isNaN(previous) && current >= previous) {
                const cubicMeters = current - previous; // Diferencia en m³
                const liters = cubicMeters * 1000; // Conversión a litros
                const weeklyAvg = liters / 8; // Consumo semanal promedio (2 meses = 8 semanas)

                setNotesData((prevState) => ({
                    ...prevState,
                    litersConsumed: liters.toFixed(2),
                }));

                setWeeklyAverage(weeklyAvg);
            } else {
                setNotesData((prevState) => ({
                    ...prevState,
                    litersConsumed: '',
                }));

                setWeeklyAverage(0);
            }
        };

        calculateConsumption();
    }, [notesData.currentReading, notesData.previousReading]);

    const handleInputChange = (field: string, value: string) => {
        setNotesData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            const userData = storedUserData ? JSON.parse(storedUserData) : {};

            const combinedData = {
                ...userData,
                notesData,
                waterPotable,
                potableWaterProvided: waterPotable === 'Sí' ? potableWaterProvided : '',
            };

            await AsyncStorage.setItem('userData', JSON.stringify(combinedData));
            Alert.alert('Datos guardados', '¡Los datos del consumo y notas se han guardado exitosamente!');
            navigation.navigate('WaterRegistred'); // Cambia a la siguiente pantalla
        } catch (e) {
            console.error('Error al guardar datos:', e);
            Alert.alert('Error', 'No se pudo guardar la información');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Notas de Consumo</Text>

            <TextInput
                style={styles.input}
                placeholder="Lectura actual del medidor"
                placeholderTextColor="#737373"
                keyboardType="numeric"
                value={notesData.currentReading}
                onChangeText={(value) => handleInputChange('currentReading', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Lectura anterior del medidor"
                placeholderTextColor="#737373"
                keyboardType="numeric"
                value={notesData.previousReading}
                onChangeText={(value) => handleInputChange('previousReading', value)}
            />

            <Text style={styles.label}>
                Consumo Calculado: {notesData.litersConsumed
                    ? `${notesData.litersConsumed} litros`
                    : 'Datos inválidos'}
            </Text>

            {/* Barra de progreso para el consumo semanal */}
            <Text style={styles.label}>Consumo semanal promedio:</Text>
            <Progress.Bar
                progress={Math.min(weeklyAverage / MAX_WEEKLY_CONSUMPTION, 1)} // Progreso en porcentaje
                width={300}
                color={weeklyAverage > MAX_WEEKLY_CONSUMPTION ? 'red' : '#04BFBF'} // Cambiar color si excede el máximo
            />
            <Text style={styles.dataText}>
                {weeklyAverage.toFixed(2)} litros/semana ({((weeklyAverage / MAX_WEEKLY_CONSUMPTION) * 100).toFixed(1)}%)
            </Text>

            <Text style={styles.label}>¿Se tiene agua potable?</Text>
            <Picker
                selectedValue={waterPotable}
                onValueChange={(itemValue) => setWaterPotable(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="No" value="No" />
                <Picker.Item label="Sí" value="Sí" />
            </Picker>

            {waterPotable === 'Sí' && (
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad de agua potable proporcionada (litros)"
                    placeholderTextColor="#737373"
                    keyboardType="numeric"
                    value={potableWaterProvided}
                    onChangeText={setPotableWaterProvided}
                />
            )}

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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 16,
        fontSize: 16,
        color: '#424242',
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
    dataText: {
        fontSize: 16,
        color: '#424242',
        marginTop: 8,
    },
});

export default RegisterWaterNotes;
