import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Modal} from 'react-native';

const RenderItem = ({item, scale1, scale2}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Elevation, setElevation] = useState(0);
    return (
        <View>
            <Pressable
                style={{...styles.sButton, borderRadius: scale2, elevation: Elevation}}
                onFocus={() => setElevation(5)}
                onBlur={() => setElevation(0)}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={{color: "blue", textAlign: "center", fontSize: scale2}}>{item.schoolName}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{...styles.modalText, fontWeight: "bold", fontSize: scale1}}>{item.schoolName}</Text>
                        <Text style={{...styles.modalText, fontSize: scale2}}>{item.overview}</Text>
                        <Text style={{...styles.modalText, fontSize: scale2}}>Located in "{item.neighborhood}" on "{item.location}"</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.button}
                        >
                            <Text style={{...styles.textStyle, fontSize: scale2}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default RenderItem;

const styles = StyleSheet.create({
    sButton: {
        //paddingVertical: 10,
        padding: 10,
        //borderColor: "#000",
        //borderBottomWidth: 1,
        //marginBottom: 10,
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