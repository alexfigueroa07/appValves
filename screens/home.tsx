import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import GraficWater from '@/components/graficWater';
import GraficoFugas from '@/components/graficLeaks';
import LeakPieChart from '@/components/graficLeaksTwo';


const Home = ({ navigation }: { navigation: any }) => {
    // Function to navigate to different screens
    const handleNavigate = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
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
            {/* Options Container */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => handleNavigate('HistoryLeaks')}
                >
                    <Text style={styles.optionTitle}>Historial de Fugas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => handleNavigate('Protocols')}
                >
                    <Text style={styles.optionTitle}>Protocolos de Fugas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => handleNavigate('Valves')}
                >
                    <Text style={styles.optionTitle}>Control de Válvulas</Text>
                </TouchableOpacity>

            </View>
            {/* Dashboard Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}></Text>
                    <View style={styles.graphContainer}>
                        <GraficoFugas />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}></Text>
                    <View style={styles.graphContainer}>
                        <LeakPieChart />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}></Text>
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
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#4BA69D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,

    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#ffffff',
    },
    contentContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#E4FEF6',
        borderRadius: 10,
        padding: 20,
        paddingTop: 10,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4BA69D',
        marginBottom: 10,
    },
    graphContainer: {
        height: 250,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphPlaceholder: {
        color: '#1E88E5',
        fontSize: 16,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    optionCard: {
        flex: 1,
        backgroundColor: '#D8F0F2',
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
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4BA69D',
        textAlign: 'center',
    },
});


export default Home;
