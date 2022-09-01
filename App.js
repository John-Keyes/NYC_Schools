import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable} from 'react-native';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';
import RenderItem from './RenderItem';

const heightScale = Dimensions.get("window").height / 600;

const scale1 = heightScale * 17;
const scale2 = heightScale * 12;

const App = () => {
    const [schools, setSchools] = useState({});
    useEffect(() => {
        let schoolsArray = [];
        axios.get("https://data.cityofnewyork.us/resource/s3k6-pzi2.json").then(res => {
            if (res.status == 200) {
                axios.get("https://data.cityofnewyork.us/resource/f9bf-2cp4.json").then(res2 => {
                    if (res2.status == 200) {
                        InfoOrg(res, res2, schoolsArray);
                        crashlytics().log("Second API Call Succeeded");
                    } else { 
                        console.log("CALL 2 ERROR" + err.message);
                        crashlytics().log("Second API Call Failed");
                    }
                }).catch(err => console.log(err.message));
            } else { 
                console.log("CALL 1 ERROR" + err.message);
                crashlytics().log("First API Call Failed");
            }
        }).catch(err => console.log(err.message));

        crashlytics().log("App mounted.");
        
    }, []);

    const InfoOrg = (data, data2, schoolsArray) => {
        for(let i = 0; i < data.length; i++) {
            const resObj = data[i];
            const key = resObj?.school_dbn;
            /*
            const dict = {
                `${key}`: {
                    dbn: key,
                    schoolName: resObj?.school_name,
                    overview: resObj?.overview_paragraph,
                    neighborhood: resObj?.neighborhood,
                    location: resObj?.location.split("(")[0]
                }
            };
            const matchingObject = res2.data[key];
            */
            const matchingObject = data2.find(element => element.dbn == key);
            console.log(matchingObject);
            schoolsArray.push({
                dbn: key,
                schoolName: resObj?.school_name,
                overview: resObj?.overview_paragraph,
                neighborhood: resObj?.neighborhood,
                location: resObj?.location.split("(")[0],
                numOfSATakers: matchingObject?.num_of_sat_test_takers,
                readingAvg: matchingObject?.sat_critical_reading_avg_score,
                mathAvg: matchingObject?.sat_math_avg_score,
                writingAvg: matchingObject?.sat_writing_avg_score
            });
        }
        //console.log(schoolsArray);
        setSchools(schoolsArray);
    }

    return (
        <View style={styles.main}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>NYC SCHOOLS</Text>
                <Text style={styles.subtitle}>Click on a school name for more information.</Text>
                <Pressable
                style={styles.crashButton}
                    onPress={() => crashlytics().crash()}
                >
                    <Text style={{textAlign: "center", fontSize: scale2}}>Test Crash</Text>
                </Pressable>
            </View>
            <FlatList
                style={styles.container}
                data={schools}
                keyExtractor={(item) => item.dbn}
                renderItem={({item}) => <RenderItem item={item} scale1={scale1} scale2={scale2}/>}
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
    crashButton: {
        borderRadius: 20,
        backgroundColor: "blue",
        padding: 10,
        textAlign: "center"
    },
    titleContainer: {
        marginTop: "5%",
        alignItems: "center"
    },
    title: {
        fontSize: scale1,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center"
    },
    subtitle: {
        fontSize: scale2,
        color: "#999"
    },
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 1, 
        borderColor: "#000",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "10%",
        marginBottom: "10%"
    },
})


