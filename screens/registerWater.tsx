import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const RegisterWater = ({ navigation }: any) => {
    const [meterNumber, setMeterNumber] = useState('');
    const [location, setLocation] = useState('');
    const [currentReading, setCurrentReading] = useState('');
    const [previousReading, setPreviousReading] = useState('');
    const [rateLevel, setRateLevel] = useState('');
    const [supplyType, setSupplyType] = useState('');
    const [previousPayment, setPreviousPayment] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const calculateConsumed = () => {
        const current = parseFloat(currentReading);
        const previous = parseFloat(previousReading);
        if (isNaN(current) || isNaN(previous)) {
            return 'N/A';
        }
        const consumed = current - previous;
        return consumed >= 0 ? consumed.toFixed(2) : 'Error';
    };

    const handleNext = async () => {
        const waterData = {
            meterNumber,
            location,
            currentReading,
            previousReading,
            consumed: calculateConsumed(),
            rateLevel,
            supplyType,
            previousPayment,
            dueDate: dueDate.toISOString(),
        };

        try {
            await AsyncStorage.setItem('waterData', JSON.stringify(waterData));
            Alert.alert('Datos guardados', '¡Los datos del medidor de agua han sido guardados exitosamente!');
            navigation.navigate('RegisterWaterNotes');
        } catch (e) {
            console.error('Error al guardar datos del medidor de agua:', e);
            Alert.alert('Error', 'No se pudo guardar la información del medidor de agua');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Medidor de Agua</Text>

            <TextInput
                style={styles.input}
                placeholder="Número de Medidor"
                placeholderTextColor="#737373"
                value={meterNumber}
                onChangeText={setMeterNumber}
            />

            <TextInput
                style={styles.input}
                placeholder="Ubicación (Ej. Casa, Oficina)"
                placeholderTextColor="#737373"
                value={location}
                onChangeText={setLocation}
            />

            <TextInput
                style={styles.input}
                placeholder="Lectura Actual (m³)"
                placeholderTextColor="#737373"
                keyboardType="numeric"
                value={currentReading}
                onChangeText={setCurrentReading}
            />

            <TextInput
                style={styles.input}
                placeholder="Lectura Anterior (m³)"
                placeholderTextColor="#737373"
                keyboardType="numeric"
                value={previousReading}
                onChangeText={setPreviousReading}
            />

            <Text style={styles.label}>Nivel de Tarifa:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. Doméstico, Comercial"
                placeholderTextColor="#737373"
                value={rateLevel}
                onChangeText={setRateLevel}
            />

            <Text style={styles.label}>Tipo de Toma que abastece:</Text>
            <RNPickerSelect
                style={{
                    inputAndroid: styles.picker,
                    inputIOS: styles.picker,
                }}
                onValueChange={(value) => setSupplyType(value)}
                items={[
                    { label: 'Vivienda', value: 'Vivienda' },
                    { label: 'Comercio', value: 'Comercio' },
                    { label: 'Industria', value: 'Industria' },
                ]}
                placeholder={{ label: 'Seleccionar', value: '' }}
            />

            <TextInput
                style={styles.input}
                placeholder="Pago Anterior"
                placeholderTextColor="#737373"
                keyboardType="numeric"
                value={previousPayment}
                onChangeText={setPreviousPayment}
            />

            <Text style={styles.label}>Fecha de Vencimiento:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                            setDueDate(date);
                        }
                    }}
                />
            )}

            <Text style={styles.label}>Consumo Calculado: {calculateConsumed()} m³</Text>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>SIGUIENTE</Text>
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#424242',
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
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#424242',
    },
    dateButton: {
        backgroundColor: '#04BFBF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    dateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
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

export default RegisterWater;
