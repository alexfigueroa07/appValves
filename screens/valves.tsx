import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Valve {
    name: string;
    type: string;
    area?: string;
    status: string;
    blue: string;
}

const Valves = () => {
    const [valves, setValves] = useState<Valve[]>([]);
    const [newValve, setNewValve] = useState<Valve>({
        name: '',
        type: 'Principal',
        area: '',
        status: 'Cerrada',
        blue: 'Desconectada',
    });
    const [showForm, setShowForm] = useState(false);
    const [showBluetoothModal, setShowBluetoothModal] = useState(false);
    const [selectedValveIndex, setSelectedValveIndex] = useState<number | null>(null);

    // Cargar válvulas guardadas al iniciar
    useEffect(() => {
        const loadValves = async () => {
            try {
                const storedValves = await AsyncStorage.getItem('valves');
                if (storedValves) {
                    setValves(JSON.parse(storedValves));
                }
            } catch (error) {
                console.error('Error al cargar las válvulas:', error);
            }
        };

        loadValves();
    }, []);

    // Guardar válvulas en AsyncStorage
    const saveValves = async (valves: Valve[]) => {
        try {
            await AsyncStorage.setItem('valves', JSON.stringify(valves));
        } catch (error) {
            console.error('Error al guardar las válvulas:', error);
        }
    };

    // Manejar el formulario de nueva válvula
    const handleAddValve = () => {
        if (!newValve.name.trim()) {
            Alert.alert('Error', 'El nombre de la válvula es obligatorio.');
            return;
        }

        const updatedValves = [...valves, newValve];
        setValves(updatedValves);
        saveValves(updatedValves);
        setNewValve({ name: '', type: 'Principal', area: '', status: 'Cerrada', blue: 'Desconectada' });
        setShowForm(false);
    };

    // Alternar el estado de una válvula
    const toggleValveStatus = (index: number) => {
        const updatedValves = [...valves];
        updatedValves[index].status =
            updatedValves[index].status === 'Cerrada' ? 'Abierta' : 'Cerrada';
        setValves(updatedValves);
        saveValves(updatedValves);
    };

    // Simular conexión Bluetooth
    const simulateBluetoothConnection = (index: number) => {
        setSelectedValveIndex(index);
        setShowBluetoothModal(true);

        setTimeout(() => {
            const updatedValves = [...valves];
            updatedValves[index].blue = 'Conectada';
            setValves(updatedValves);
            saveValves(updatedValves);
            setShowBluetoothModal(false);
        }, 4000); // Simulación de 4 segundos
    };

    // Eliminar una válvula
    const deleteValve = (index: number) => {
        const updatedValves = valves.filter((_, i) => i !== index);
        setValves(updatedValves);
        saveValves(updatedValves);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Control de Válvulas</Text>

            {!showForm ? (
                <>
                    {/* Botón para agregar una nueva válvula */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setShowForm(true)}
                    >
                        <Text style={styles.addButtonText}>Agregar Nueva Válvula</Text>
                    </TouchableOpacity>

                    {/* Lista de válvulas */}
                    {valves.length === 0 ? (
                        <Text style={styles.noValvesText}>No hay válvulas registradas.</Text>
                    ) : (
                        <FlatList
                            data={valves}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.valveCard}>
                                    <Text style={styles.valveName}>{item.name}</Text>
                                    <Text style={styles.valveInfo}>Tipo: {item.type}</Text>
                                    {item.type === 'Secundaria' && (
                                        <Text style={styles.valveInfo}>Área: {item.area}</Text>
                                    )}
                                    <Text style={styles.valveInfo}>Estado: {item.status}</Text>
                                    <Text style={styles.valveInfo}>Bluetooth: {item.blue}</Text>
                                    <View style={styles.cardButtons}>
                                        <TouchableOpacity
                                            style={styles.toggleButton}
                                            onPress={() => simulateBluetoothConnection(index)}
                                        >
                                            <Text style={styles.toggleButtonText}>
                                                {item.blue === 'Desconectada' ? 'Conectar' : 'Desconectar'}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.toggleButton}
                                            onPress={() => toggleValveStatus(index)}
                                        >
                                            <Text style={styles.toggleButtonText}>
                                                {item.status === 'Cerrada' ? 'Abrir' : 'Cerrar'}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => deleteValve(index)}
                                        >
                                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </>
            ) : (
                // Formulario para agregar nueva válvula
                <View style={styles.formContainer}>
                    <Text style={styles.modalTitle}>Nueva Válvula</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la válvula"
                        value={newValve.name}
                        onChangeText={(text) =>
                            setNewValve((prev) => ({ ...prev, name: text }))
                        }
                    />
                    <Text style={styles.label}>Tipo de válvula</Text>
                    <Picker
                        selectedValue={newValve.type}
                        onValueChange={(value) =>
                            setNewValve((prev) => ({
                                ...prev,
                                type: value,
                                area: value === 'Principal' ? '' : prev.area,
                            }))
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label="Principal" value="Principal" />
                        <Picker.Item label="Secundaria" value="Secundaria" />
                    </Picker>
                    {newValve.type === 'Secundaria' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Área de la válvula"
                            value={newValve.area}
                            onChangeText={(text) =>
                                setNewValve((prev) => ({ ...prev, area: text }))
                            }
                        />
                    )}
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: '#B0BEC5' }]}
                            onPress={() => setShowForm(false)}
                        >
                            <Text style={styles.addButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddValve}
                        >
                            <Text style={styles.addButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Modal para la simulación de conexión Bluetooth */}
            <Modal visible={showBluetoothModal} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Conectando a Bluetooth MERCA...</Text>
                        <ActivityIndicator size="large" color="#04BFBF" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#04BFBF', marginBottom: 20 },
    addButton: {
        backgroundColor: '#04BFBF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    valveCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    valveName: { fontSize: 18, fontWeight: 'bold', color: '#424242' },
    valveInfo: { fontSize: 14, color: '#737373', marginTop: 5 },
    cardButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    toggleButton: {
        backgroundColor: '#04BFBF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    toggleButtonText: { color: '#FFFFFF', fontSize: 14 },
    deleteButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButtonText: { color: '#FFFFFF', fontSize: 14 },
    noValvesText: { textAlign: 'center', color: '#737373', marginTop: 20 },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#04BFBF', marginBottom: 15 },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#737373',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 14,
    },
    label: { fontSize: 14, color: '#737373', marginBottom: 5 },
    picker: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#737373',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
});

export default Valves;
