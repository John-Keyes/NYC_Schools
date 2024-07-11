import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import RenderItem from './components/renderItem';
import { SchoolType } from './models/schools';
import {lockAsync, OrientationLock} from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';

const heightScale: number = Dimensions.get("window").height / 600;
const apiHost: string = process.env.EXPO_PUBLIC_API_HOST as string

const App = () => {
    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [appMounted, setAppMounted] = useState<boolean>(false);
    const HideSplash = useCallback(async () => {
        //When the app mounts, we need to hide the splashscreen.
        if(appMounted) {
          await SplashScreen.hideAsync();
        }
    }, [appMounted]);
    useEffect(() => {
        const LoadApp = async () => {
            try {
              //Locking the screen to portrait up (The screen cannot be flipped).
              await lockAsync(OrientationLock.PORTRAIT_UP);
            }
            catch(e) {
              console.error(e);
            }
            finally {
              setAppMounted(true);
            }
          }
        const GetSchools = async () => {
            const response = await fetch(apiHost, {method: "GET", mode: "cors"});
            const res = await response.json();
            setSchools(res);
        }
        LoadApp();
        GetSchools();
    }, []);
    

    return (
        <View style={styles.main} onLayout={HideSplash}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>NYC SCHOOLS</Text>
                <Text style={styles.subtitle}>Click on a school name for more information.</Text>
            </View>
            <FlatList
                style={styles.container}
                data={schools}
                keyExtractor={(item: SchoolType) => item.dbn}
                renderItem={({item}) => <RenderItem item={item} heightScale={heightScale}/>}
            />
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        marginTop: "10%",
        alignItems: "center"
    },
    title: {
        fontSize: heightScale * 17,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center"
    },
    subtitle: {
        fontSize: heightScale * 12,
        color: "#999"
    },
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center", 
        alignItems: "center",
        //borderWidth: 1, 
        //borderColor: "#000",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "10%",
        marginBottom: "10%"
    },
})