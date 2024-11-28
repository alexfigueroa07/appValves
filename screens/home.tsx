import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import GraficWater from '@/components/graficWater';
import GraficoFugas from '@/components/graficLeaks';
import LeakPieChart from '@/components/graficLeaksTwo';

const Home = ({ navigation }: { navigation: any }) => {
    const handleNavigate = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleNavigate('WelcomeUser')}>
                    <Image source={require('../assets/images/casa.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigate('Notification')}>
                    <Image source={require('../assets/images/campana.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigate('About')}>
                    <Image source={require('../assets/images/duda.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>

            {/* Opciones de navegación */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionCard} onPress={() => handleNavigate('HistoryLeaks')}>
                    <Text style={styles.optionTitle}>Historial de Fugas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionCard} onPress={() => handleNavigate('Protocols')}>
                    <Text style={styles.optionTitle}>Protocolos de Fugas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionCard} onPress={() => handleNavigate('Valves')}>
                    <Text style={styles.optionTitle}>Control de Válvulas</Text>
                </TouchableOpacity>
            </View>

            {/* Gráficas */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Análisis de Fugas</Text>
                    <View style={styles.graphContainer}>
                        <GraficoFugas />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Distribución de Fugas</Text>
                    <View style={styles.graphContainer}>
                        <LeakPieChart />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Consumo de Agua</Text>
                    <View style={styles.graphContainer}>
                        <GraficWater />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#04BFBF', // Azul principal
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    optionCard: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Gris claro
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#04BFBF', // Azul principal
        textAlign: 'center',
    },
    contentContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#F5F5F5', // Gris claro
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#04BFBF', // Azul principal
        marginBottom: 10,
    },
    graphContainer: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default Home;
