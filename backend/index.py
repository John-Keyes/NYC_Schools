from flask import Flask, jsonify
from config import mySql
from models.school import School
app = Flask(__name__)


@app.route("/", methods=["GET"])
def GetSchools():
    res1Full = mySql.execute("SELECT * FROM Schools")
    res1 = res1Full[0]
    res2 = res2.get("https://data.cityofnewyork.us/resource/f9bf-2cp4.json")
    #res2.json()
    #return res.status(200).json(res2);
    schoolsArray = []
    for res1Obj in res1:
        #const res1Obj = res1[i]
        key = res1Obj.dbn
        matchingObject = next(element for element in res2 if element.dbn == key)
        school = School(
            key, 
            res1Obj.school_name,
            res1Obj.overview,
            res1Obj.neighborhood,
            res1Obj.location.split("(")[0],
            matchingObject.num_of_sat_test_takers,
            matchingObject.sat_critical_reading_avg_score,
            matchingObject.sat_math_avg_score,
            matchingObject.sat_writing_avg_score
        )
        schoolsArray.append(school)
    #@api.response(200, schoolsArray)
    return jsonify(schoolsArray)