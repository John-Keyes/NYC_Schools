from flask import Flask
import Schools
import config
import requests
app = Flask(__name__)


@app.route("/")
def GetSchools():
        res1Full = mySql.execute("SELECT * FROM Schools")
        res1 = res1Full[0]
        res2 = res2.get("https://data.cityofnewyork.us/resource/f9bf-2cp4.json")
        res2.json()
        #return res.status(200).json(res2);
        schoolsArray = []
        for res1Obj in res1:
            #const res1Obj = res1[i]
            key = res1Obj.dbn
            matchingObject = res2.data.find(element => element.dbn == key);
            schoolsArray.append({
                dbn: key,
                schoolName: res1Obj.school_name,
                overview: res1Obj.overview,
                neighborhood: res1Obj.neighborhood,
                location: res1Obj.location.split("(")[0],
                numOfSATakers: matchingObject.num_of_sat_test_takers,
                readingAvg: matchingObject.sat_critical_reading_avg_score,
                mathAvg: matchingObject.sat_math_avg_score,
                writingAvg: matchingObject.sat_writing_avg_score
            })
        
        res.status(200).json(schoolsArray);