import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

// Tipo para los datos de la gráfica
type ChartData = {
    labels: string[];
    datasets: {
        data: number[];
        color: (opacity: number) => string;
    }[];
    legend: string[];
};

const GraficoFugas = () => {
    const [data, setData] = useState<ChartData | null>(null); // Estado de la gráfica

    useEffect(() => {
        // Cargar datos desde AsyncStorage
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                let previousReading = 10; // Valor genérico inicial (anterior)
                let currentReading = 15; // Valor genérico inicial (actual)

                if (storedData) {
                    const userData = JSON.parse(storedData);
                    previousReading = parseFloat(userData.previousReading || '10');
                    currentReading = parseFloat(userData.currentReading || '15');
                }

                const totalConsumption = previousReading ? currentReading - previousReading : 0;

                // Configuración dinámica de la gráfica
                const chartData: ChartData = {
                    labels: ['Consumo Anterior', 'Consumo Actual'],
                    datasets: [
                        {
                            data: [previousReading, currentReading],
                            color: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`, // Color dinámico
                        },
                    ],
                    legend: [`Consumo Total: ${totalConsumption.toFixed(2)} m³`],
                };

                setData(chartData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        // Mostrar un indicador de carga mientras se obtienen datos
        return <ActivityIndicator size="large" color="#4BA69D" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consumo de Agua</Text>
            <BarChart
                data={data}
                width={screenWidth - 40} // Ancho del gráfico
                height={220} // Alto del gráfico
                yAxisLabel=""
                yAxisSuffix="m³"
                fromZero={true}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    barPercentage: 0.5,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4FABAA',
        textAlign: 'center',
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: '#4FABAA',
    },
});

export default GraficoFugas;
