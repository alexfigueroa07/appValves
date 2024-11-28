import React from 'react';
import { View, Button, Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

const OpenBluetoothSettingsButton = () => {
    const openBluetoothSettings = () => {
        if (Platform.OS === 'android') {
            IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.BLUETOOTH_SETTINGS);
        } else {
            // Para iOS, puedes mostrar una alerta indicando que deben activar Bluetooth desde la configuración
            alert('Por favor, activa Bluetooth desde la configuración del dispositivo.');
        }
    };

    return (
        <View style={{ margin: 20 }}>
            <Button title="Abrir Configuración de Bluetooth" onPress={openBluetoothSettings} />
        </View>
    );
};

export default OpenBluetoothSettingsButton;
