import { SchoolType } from '@/models/schools';
import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Modal, ScrollView} from 'react-native';

type renderItemType = {
    item: SchoolType, 
    heightScale: number
};

const RenderItem = ({item, heightScale}: renderItemType) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Elevation, setElevation] = useState(0);
    const [borderColor, setBorderColor] = useState("#999");
    return (
        <View>
            <Pressable
                style={{...styles.sButton, borderRadius: heightScale * 5, elevation: Elevation, borderColor: borderColor}}
                onFocus={() => {setElevation(5); setBorderColor("#000");}}
                onBlur={() => {setElevation(0); setBorderColor("#999");}}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={{color: "blue", textAlign: "center", fontSize: heightScale * 12}}>{item.schoolName}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                style={{margin: "5%"}}
            >
                <ScrollView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{...styles.modalText, fontWeight: "bold", fontSize: heightScale * 17}}>{item.schoolName}</Text>
                        <Text style={{...styles.modalText, fontSize: heightScale * 12}}>{item.overview}</Text>
                        <Text style={{...styles.modalText, fontSize: heightScale * 12}}>Located in "{item.neighborhood}" on "{item.location}"</Text>
                        <Text style={{...styles.modalText, fontWeight: "bold", fontSize: heightScale * 13}}>SAT stats</Text>
                        <Text style={{...styles.modalText, marginBottom: 0, fontSize: heightScale * 12}}>Number of SAT takers: {item.numOfSATakers}</Text>
                        <Text style={{...styles.modalText, marginBottom: 0, fontSize: heightScale * 12}}>Average SAT reading score: {item.readingAvg}</Text>
                        <Text style={{...styles.modalText, marginBottom: 0, fontSize: heightScale * 12}}>Average SAT math score: {item.mathAvg}</Text>
                        <Text style={{...styles.modalText, fontSize: heightScale * 12}}>Average SAT writing score: {item.writingAvg}</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.button}
                        >
                            <Text style={{...styles.textStyle, fontSize: heightScale * 12}}>Close</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}

export default RenderItem;

const styles = StyleSheet.create({
    sButton: {
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: "10%",
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        backgroundColor: "red",
        padding: 10,
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: "8%",
        textAlign: "center"
    }
});