import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LeakRecord = {
    id: string;
    month: string;
    status: string;
    priority: string;
    wastedLiters: number;
};

const HistoryLeaks = () => {
    const [historyData, setHistoryData] = useState<LeakRecord[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLeak, setNewLeak] = useState<Partial<LeakRecord>>({
        month: '',
        status: '',
        priority: '',
        wastedLiters: 0,
    });

    useEffect(() => {
        // Load initial data from AsyncStorage
        const loadHistory = async () => {
            try {
                const storedData = await AsyncStorage.getItem('leakHistory');
                if (storedData) {
                    setHistoryData(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Error loading leak history:', error);
            }
        };
        loadHistory();
    }, []);

    const saveHistory = async (newData: LeakRecord[]) => {
        try {
            await AsyncStorage.setItem('leakHistory', JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving leak history:', error);
        }
    };

    const handleAddLeak = () => {
        if (!newLeak.month || !newLeak.status || !newLeak.priority || !newLeak.wastedLiters) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        const newLeakRecord: LeakRecord = {
            id: Date.now().toString(),
            month: newLeak.month || '',
            status: newLeak.status || '',
            priority: newLeak.priority || '',
            wastedLiters: Number(newLeak.wastedLiters),
        };

        const updatedData = [...historyData, newLeakRecord];
        setHistoryData(updatedData);
        saveHistory(updatedData);
        setNewLeak({ month: '', status: '', priority: '', wastedLiters: 0 });
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: LeakRecord }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.month}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>{item.priority}</Text>
            <Text style={styles.cell}>{item.wastedLiters} L</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Fugas</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Agregar Fuga</Text>
            </TouchableOpacity>

            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Mes</Text>
                <Text style={styles.headerCell}>Estado</Text>
                <Text style={styles.headerCell}>Prioridad</Text>
                <Text style={styles.headerCell}>Litros Desperdiciados</Text>
            </View>

            <FlatList
                data={historyData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.tableContent}
            />

            {/* Modal para agregar nueva fuga */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Agregar Nueva Fuga</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mes"
                            placeholderTextColor="#737373"
                            value={newLeak.month}
                            onChangeText={(text) =>
                                setNewLeak((prev) => ({ ...prev, month: text }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado (Ej: Reparada)"
                            placeholderTextColor="#737373"
                            value={newLeak.status}
                            onChangeText={(text) =>
                                setNewLeak((prev) => ({ ...prev, status: text }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Prioridad (Alta, Media, Baja)"
                            placeholderTextColor="#737373"
                            value={newLeak.priority}
                            onChangeText={(text) =>
                                setNewLeak((prev) => ({ ...prev, priority: text }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Litros Desperdiciados"
                            placeholderTextColor="#737373"
                            keyboardType="numeric"
                            value={newLeak.wastedLiters?.toString() || ''}
                            onChangeText={(text) =>
                                setNewLeak((prev) => ({
                                    ...prev,
                                    wastedLiters: parseFloat(text) || 0,
                                }))
                            }
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleAddLeak}
                        >
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4FABAA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
    },
    tableContent: {
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        marginBottom: 5,
    },
    cell: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
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
        color: '#333333',
    },
    saveButton: {
        backgroundColor: '#4FABAA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HistoryLeaks;
