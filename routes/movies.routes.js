const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await MovieModel.find();
    res.render("movies/movies", {allMovies});
  } catch(error) {
    console.log("In Movies: ", error);
  }
});

router.get("/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/create", async (req, res, next) => {
  try {
/*     const newMovie = [...req.body, req.body.cast.split(",")]; */
    const {title, genre, plot, cast} = req.body;
    const newMovie = {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast.split(","),
    }
    await MovieModel.create(newMovie);
    res.redirect("/movies");
  } catch (error) {
    console.log("In Movie / Create: ", error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await MovieModel.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {movie});
  } catch (error) {
    console.log("In Movie / ID: ", error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await MovieModel.findByIdAndDelete(req.params.id);
    res.redirect("/movies")
  } catch (error) {
    console.log("In Movie / Delete: ", error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    const celebrities = await CelebrityModel.find();
    res.render("movies/edit-movie", {movie: movie, celebrities: celebrities})
  } catch (error) {
    console.log("In Movie / Edit (Get): ", error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const changedMovie = req.body;
    await MovieModel.findByIdAndUpdate(req.params.id, {...req.body, cast: req.body.cast});
    res.redirect("/movies/" + req.params.id)
  } catch (error) {
    console.log("In Movie / Edit (Post): ", error);
  }
});

module.exports = router;
