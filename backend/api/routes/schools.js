const router = require("express").Router();
const {getSchools} = require("../controllers/schools.js");
router.get("/all", getSchools);
module.exports = router;