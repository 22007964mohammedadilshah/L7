import React, { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data';

const Edit = ({ navigation, route }) => {
    const { index, type, name, calories } = route.params;

    const [foodName, setFoodName] = useState(name);
    const [foodCalories, setFoodCalories] = useState(calories.toString());

    return (
        <View style={{ padding: 10 }}>
            <Text style={styles.label}>Edit Food Name:</Text>
            <TextInput
                style={styles.input}
                value={foodName}
                onChangeText={(text) => setFoodName(text)}
            />
            <Text style={styles.label}>Edit Calories:</Text>
            <TextInput
                style={styles.input}
                value={foodCalories}
                keyboardType="numeric"
                onChangeText={(text) => setFoodCalories(text)}
            />
            <View style={styles.buttonRow}>
                <Button
                    title="SAVE"
                    onPress={() => {
                        const section = datasource.find((sec) => sec.title === type);
                        section.data[index] = {
                            name: foodName,
                            calories: parseInt(foodCalories, 10),
                        };
                        navigation.navigate('Home');
                    }}
                />
                <Button
                    title="DELETE"
                    onPress={() => {
                        Alert.alert(
                            'Are you sure you want to delete?',
                            '',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        const section = datasource.find((sec) => sec.title === type);
                                        section.data.splice(index, 1);
                                        navigation.navigate('Home');
                                    },
                                },
                                { text: 'No' },
                            ]
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Edit;
