import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const GraficWater = () => {
    const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // Consumo por día
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(new Date().getDay()); // Día actual (0 = Domingo, 6 = Sábado)

    useEffect(() => {
        // Simulación de datos aleatorios para la semana actual
        const generateRandomData = () => {
            const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 5); // Consumo entre 5 y 50 litros
            setWeeklyData(randomData);
        };

        generateRandomData();
    }, []);

    const dayLabels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // Determinar el color de los puntos según el día actual
    const dotColors = weeklyData.map((_, index) =>
        index === currentDayIndex ? 'rgba(255, 0, 0, 1)' : 'rgba(79, 171, 170, 1)'
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Día actual: {dayLabels[currentDayIndex]} - Consumo: {weeklyData[currentDayIndex]} L</Text>

            <LineChart
                data={{
                    labels: dayLabels,
                    datasets: [
                        {
                            data: weeklyData,
                            color: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`, // Color de la línea
                            strokeWidth: 2, // Grosor de la línea
                        },
                    ],
                }}
                width={screenWidth - 40} // Ancho del gráfico
                height={250} // Alto del gráfico
                yAxisLabel=""
                yAxisSuffix=" L"
                fromZero
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(79, 171, 170, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#fff',
                        getFillColor: (dataPoint, index) => dotColors[index], // Colores dinámicos de los puntos
                    },
                }}
                bezier
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

export default GraficWater;
