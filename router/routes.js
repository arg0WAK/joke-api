import { readFileSync } from "fs";
import { Router } from "express";

const jokes = JSON.parse(readFileSync("./data/jokes.json", "utf-8"));
const router = Router();
const json = jokes.jokes;
const categories = Object.keys(json);

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

router.get("/", (req, res) => {
    return res.json({
        title: "Welcome to the Joke API by arg0WAK",
        description:
            "A simple API that returns a random joke with multi languages. Free and Open Source Joke API, entirely self-hosted.",
        endpoints: categories.map((category) => ({
            url: `/${category}`,
            method: "GET",
            description: `Return jokes from ${category}`,
        })),
    });
});

/**
 * @swagger
 * /{category}:
 *   get:
 *     summary: Get jokes by category
 *     description: Returns jokes based on category, language, and translation
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category of the joke
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         required: false
 *         description: Language of the joke
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: Type key of the joke
 *         schema:
 *           type: string
 *       - in: query
 *         name: random
 *         required: false
 *         description: Whether to return a random joke
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request
 */
router.get("/:category", (req, res) => {
    const { category } = req.params;
    const { type: typeIndex, lang: langIndex, random } = req.query;
    const response = json[category];

    if (category === "any") {
        const randomCategory = getRandomElement(categories);
        const queryParams = new URLSearchParams(req.query);

        return res.redirect(
            randomCategory + (queryParams ? `?${queryParams}` : ""),
        );
    }

    if (!response) {
        return res.status(404).json({ error: "Category not found!" });
    }

    const selectedGenres = response.genres;

    if (langIndex && !typeIndex) {
        const allLanguages = new Set();

        Object.values(selectedGenres).forEach((languageGroup) => {
            languageGroup.forEach((jokesObj) => {
                Object.keys(jokesObj).forEach((lang) => allLanguages.add(lang));
            });
        });

        const languageList = Array.from(allLanguages);

        if (!languageList.includes(langIndex)) {
            return res
                .status(404)
                .json({ error: "Translation key not found!" });
        }

        const allJokes = Object.values(selectedGenres).flatMap(
            (languageGroup) =>
                languageGroup.map((jokeObj) => jokeObj[langIndex]?.joke),
        );

        return random === "true"
            ? res.json({ joke: getRandomElement(allJokes) })
            : res.json({ [langIndex]: allJokes });
    }

    if (!langIndex && !typeIndex && random === "true") {
        return res.json({
            error: "At least one translation query must be defined!",
        });
    }

    if (typeIndex) {
        const languageJokes = selectedGenres[typeIndex];
        if (!languageJokes)
            return res.status(404).json({ error: "Type not found!" });

        if (!langIndex) {
            return res.json(
                random === "true"
                    ? {
                        error: "At least one translation query must be defined!",
                    }
                    : languageJokes,
            );
        }

        const translatedJokes = languageJokes
            .map((joke) => joke[langIndex]?.joke)
            .filter(Boolean);
        if (translatedJokes.length === 0)
            return res
                .status(404)
                .json({ error: "Translation key not found!" });

        return random === "true"
            ? res.json({ joke: getRandomElement(translatedJokes) })
            : res.json({ [langIndex]: translatedJokes });
    }

    return res.json(response);
});

export default router;
