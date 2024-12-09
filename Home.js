import React from 'react';
import {
    StatusBar,
    Button,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 for icons
import { datasource } from './Data';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();


    const getSectionIcon = (title) => {
        switch (title) {
            case 'Fast Food':
                return <FontAwesome5 name="hamburger" size={20} color="#FFF" />;
            case 'Vegetables':
                return <FontAwesome5 name="carrot" size={20} color="#FFF" />;
            case 'Fruits':
                return <FontAwesome5 name="apple-alt" size={20} color="#FFF" />;
            case 'Meals':
                return <FontAwesome5 name="utensils" size={20} color="#FFF" />;
            default:
                return <FontAwesome5 name="question-circle" size={20} color="#FFF" />;
        }
    };


    const calculateTotalCalories = () => {
        let totalCalories = 0;


        datasource.forEach((section) => {
            section.data.forEach((item) => {
                totalCalories += item.calories;
            });
        });


        const maleExceeded = totalCalories > 2500 ? 'Yes' : 'No';
        const femaleExceeded = totalCalories > 2000 ? 'Yes' : 'No';

        // Show the results in an alert
        Alert.alert(
            'Total Calories',
            `Total Calorie Intake: ${totalCalories} cal\n` +
            `Exceeds Male Recommendation (2500 cal): ${maleExceeded}\n` +
            `Exceeds Female Recommendation (2000 cal): ${femaleExceeded}`
        );
    };

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                navigation.navigate('Edit', {
                    index: index,
                    type: section.title,
                    name: item.name,
                    calories: item.calories,
                });
            }}
        >
            <Text style={styles.itemText}>
                <FontAwesome5 name="utensils" size={18} color="#FF4500" /> {item.name} ({item.calories} cal)
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.buttonWrapper}>
                <Button
                    title="Add Food"
                    onPress={() => {
                        navigation.navigate('Add');
                    }}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Calculate Calories"
                    onPress={calculateTotalCalories}
                />
            </View>
            <SectionList
                sections={datasource}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <View style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
                        {getSectionIcon(title)}
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    buttonWrapper: {
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    sectionHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'serif',
        color: '#FFF',
        marginLeft: 10,
    },
    listItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 16,
        color: '#000',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
});

export default Home;
