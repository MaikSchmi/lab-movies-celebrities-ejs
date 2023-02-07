const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
    try {
        const allCelebs = await CelebrityModel.find();
        res.render("celebrities/celebrities", {allCelebs});
    } catch (error) {
        console.log("In Celebrities: ", error);
    }
});

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
    try {
        const newCelebrity = req.body;
        await CelebrityModel.create(newCelebrity);
        res.redirect("../celebrities");
    } catch (error) {
        console.log("In Celebrities/Create: ", error);
    }
});

module.exports = router;
