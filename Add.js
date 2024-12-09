import React, { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { datasource } from './Data';

const Add = ({ navigation }) => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [type, setType] = useState('Fast Food');

    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.titleHeader}>Add Food</Text>
            <Text style={styles.label}>Food Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter food name"
                onChangeText={(text) => setFoodName(text)}
                value={foodName}
            />
            <Text style={styles.label}>Calories:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter calories"
                keyboardType="numeric"
                onChangeText={(text) => setCalories(text)}
                value={calories}
            />
            <Text style={styles.label}>Category:</Text>
            <RNPickerSelect
                value={type}
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Fast Food', value: 'Fast Food' },
                    { label: 'Vegetables', value: 'Vegetables' },
                    { label: 'Fruits', value: 'Fruits' },
                    { label: 'Meals', value: 'Meals' },
                ]}
                style={{
                    inputIOS: styles.pickerInput,
                    inputAndroid: styles.pickerInput,
                }}
                Icon={() => <Icon name="caret-down" size={20} color="#FF4500" />}
            />
            <Button
                title="SUBMIT"
                onPress={() => {
                    if (foodName && calories) {
                        const section = datasource.find((sec) => sec.title === type);
                        section.data.push({ name: foodName, calories: parseInt(calories, 10) });
                        navigation.navigate('Home');
                    } else {
                        alert('Please fill in all fields.');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleHeader: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    pickerInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: '#000',
    },
});

export default Add;
