const db = require("../config/dbConnection.js");
const axios = require("axios");

module.exports = {
    getSchools: async (req, res) => {
        const res1Full = await db.promise().query("SELECT * FROM Schools").catch(() => res.status(500).json({message: "Internal Server Error."}));
        const res1 = res1Full[0];
        const res2 = await axios.get("https://data.cityofnewyork.us/resource/f9bf-2cp4.json").catch(() => res.status(500).json({message: "Internal Server Error."}));
        //return res.status(200).json(res2);
        let schoolsArray = [];
        for(let i = 0; i < res1.length; i++) {
            const res1Obj = res1[i];
            const key = res1Obj?.dbn;
            const matchingObject = res2.data.find(element => element.dbn == key);
            schoolsArray.push({
                dbn: key,
                schoolName: res1Obj?.school_name,
                overview: res1Obj?.overview,
                neighborhood: res1Obj?.neighborhood,
                location: res1Obj?.location.split("(")[0],
                numOfSATakers: matchingObject?.num_of_sat_test_takers,
                readingAvg: matchingObject?.sat_critical_reading_avg_score,
                mathAvg: matchingObject?.sat_math_avg_score,
                writingAvg: matchingObject?.sat_writing_avg_score
            });
        }
        res.status(200).json(schoolsArray);
    }
};