import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventType } from 'react-native-bluetooth-classic';
import { DeviceEventEmitter } from 'react-native';

const Valves = () => {
    const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [receivedData, setReceivedData] = useState('');
    const [flowRate, setFlowRate] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);

    // Escanear dispositivos emparejados al montar el componente
    useEffect(() => {
        const fetchPairedDevices = async () => {
            try {
                const devices: BluetoothDevice[] = await RNBluetoothClassic.getBondedDevices();
                setBluetoothDevices(devices);
                Alert.alert('Dispositivos encontrados', `Se encontraron ${devices.length} dispositivos emparejados.`);
            } catch (error) {
                console.error('Error al obtener dispositivos emparejados:', error);
                Alert.alert('Error', 'No se pudieron obtener los dispositivos emparejados.');
            }
        };

        fetchPairedDevices();
    }, []);
    useEffect(() => {
        const checkBluetooth = async () => {
            try {
                const isBluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();
                if (!isBluetoothEnabled) {
                    Alert.alert('Bluetooth deshabilitado', 'Por favor, habilita el Bluetooth en tu dispositivo.');
                } else {
                    fetchPairedDevices(); // Llama la función para buscar dispositivos emparejados
                }
            } catch (error) {
                console.error('Error al verificar Bluetooth:', error);
            }
        };

        checkBluetooth();
    }, []);

    // Listener para recibir datos del dispositivo conectado
    useEffect(() => {
        if (connectedDevice) {
            const subscription = DeviceEventEmitter.addListener(
                BluetoothEventType.READ,
                (event: { data: string }) => {
                    try {
                        const data = event.data.trim();
                        setReceivedData((prev) => prev + '\n' + data);

                        // Parsear flujo y volumen
                        if (data.includes('Flujo:') && data.includes('Volumen acumulado:')) {
                            const flowMatch = data.match(/Flujo:\s([\d.]+)\sL\/s/);
                            const volumeMatch = data.match(/Volumen acumulado:\s([\d.]+)\sL/);

                            if (flowMatch && volumeMatch) {
                                setFlowRate(parseFloat(flowMatch[1]));
                                setTotalVolume(parseFloat(volumeMatch[1]));
                            }
                        }
                    } catch (error) {
                        console.error('Error al procesar los datos recibidos:', error);
                    }
                }
            );

            // Limpieza
            return () => subscription.remove();
        }
    }, [connectedDevice]);

    // Conectar al dispositivo seleccionado
    const connectToDevice = async (device: BluetoothDevice) => {
        try {
            const connected = await RNBluetoothClassic.connectToDevice(device.id);
            setConnectedDevice(connected);
            Alert.alert('Conexión exitosa', `Conectado a ${device.name}`);
        } catch (error) {
            console.error('Error al conectar al dispositivo:', error);
            Alert.alert('Error', 'No se pudo conectar al dispositivo Bluetooth.');
        }
    };

    // Enviar comando al Arduino
    const sendCommand = async (command: string) => {
        if (!connectedDevice) {
            Alert.alert('Error', 'No estás conectado a un dispositivo Bluetooth.');
            return;
        }

        try {
            await connectedDevice.write(`${command}\n`); // Enviar comando con salto de línea
            Alert.alert('Comando enviado', `Se envió el comando: ${command}`);
        } catch (error) {
            console.error('Error al enviar comando:', error);
            Alert.alert('Error', 'No se pudo enviar el comando.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Control de Válvulas</Text>

            {connectedDevice ? (
                <View>
                    <Text style={styles.subtitle}>Dispositivo conectado: {connectedDevice.name}</Text>
                    <View style={styles.valveContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sendCommand('A1')}
                        >
                            <Text style={styles.buttonText}>Abrir Válvula Principal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sendCommand('B1')}
                        >
                            <Text style={styles.buttonText}>Cerrar Válvula Principal</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.valveContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sendCommand('A2')}
                        >
                            <Text style={styles.buttonText}>Abrir Válvula Baño</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sendCommand('B2')}
                        >
                            <Text style={styles.buttonText}>Cerrar Válvula Baño</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dataText}>Flujo actual: {flowRate} L/s</Text>
                    <Text style={styles.dataText}>Volumen total: {totalVolume} L</Text>
                </View>
            ) : (
                <FlatList
                    data={bluetoothDevices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.deviceButton}
                            onPress={() => connectToDevice(item)}
                        >
                            <Text style={styles.deviceText}>{item.name || 'Sin nombre'}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#4BA69D', marginBottom: 20 },
    subtitle: { fontSize: 18, color: '#B0B0B0', marginBottom: 10 },
    button: { backgroundColor: '#4BA69D', padding: 10, borderRadius: 5, marginBottom: 10 },
    buttonText: { color: '#FFFFFF', textAlign: 'center' },
    deviceButton: { padding: 10, backgroundColor: '#333333', borderRadius: 5, marginBottom: 10 },
    deviceText: { color: '#B0B0B0', textAlign: 'center' },
    valveContainer: { marginBottom: 20 },
    dataText: { fontSize: 16, color: '#B0B0B0', marginTop: 10 },
});

export default Valves;
