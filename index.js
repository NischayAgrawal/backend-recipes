import express from "express";
import Recipe from "./model/recipe.model.js";
import dotenv from "dotenv";
import initializeDB from "./db/db.connect.js";
dotenv.config();

initializeDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server up and running :)");
});

app.post("/recipes", async (req, res) => {
  try {
    const recipe = await new Recipe(req.body).save();
    res
      .status(200)
      .json({ message: "Successfully added a new recipe", recipe });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "No recipes found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "No recipe found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/recipes/author/:author", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ author: req.params.author });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "No recipe found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/recipes/difficulty/easy", async (req, res) => {
  try {
    const recipes = await Recipe.find({ difficulty: "Easy" });
    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "No recipe found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/recipes/update/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { difficulty: "Easy" },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Successfully updated the recipe", recipe });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/recipes/update/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Successfully updated the recipe", recipe });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Successfully deleted the recipe", recipe });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Successfully connected to db");
});
