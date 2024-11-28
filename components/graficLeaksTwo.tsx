import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const LeakPieChart = () => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('leakHistory');
                if (storedData) {
                    const leakHistory = JSON.parse(storedData);

                    // Agrupar datos por prioridad
                    const priorityCounts = leakHistory.reduce(
                        (acc: any, leak: any) => {
                            acc[leak.priority] = (acc[leak.priority] || 0) + 1;
                            return acc;
                        },
                        {}
                    );

                    // Preparar los datos para el gráfico de pastel
                    const formattedData = Object.keys(priorityCounts).map((priority) => ({
                        name: priority,
                        count: priorityCounts[priority],
                        color:
                            priority === 'ALTA'
                                ? '#FF4D4D'
                                : priority === 'MEDIA'
                                    ? '#FFD700'
                                    : '#4FABAA',
                        legendFontColor: '#333333',
                        legendFontSize: 12,
                    }));

                    setChartData(formattedData);
                }
            } catch (error) {
                console.error('Error al cargar los datos del historial de fugas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#4FABAA" />;
    }

    if (chartData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>No hay datos disponibles para mostrar.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Distribución de Prioridades de Fugas</Text>
            <PieChart
                data={chartData}
                width={screenWidth - 40} // Ancho del gráfico
                height={220} // Alto del gráfico
                chartConfig={{
                    color: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`,
                }}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute // Mostrar valores absolutos
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4FABAA',
        textAlign: 'center',
        marginBottom: 10,
    },
    noDataText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LeakPieChart;
