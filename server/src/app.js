const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const genAI = new GoogleGenerativeAI("AIzaSyCVSWgNbjIGl51bndweB1qIyRUDs7ZFszo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/", async (req, res) => {
    console.log("Got a POST request");
  try {
    console.log(req.body.text);
    const text=req.body.text;
    const prompt = `Analyze the following coding problem and provide three different approaches with their implementations in C++. For each approach, include:

            1. BRUTE FORCE APPROACH:
            - Detailed explanation of the approach
            - Time and Space complexity analysis
            - Complete C++ implementation with comments
            - Any limitations or drawbacks

            2. BETTER APPROACH:
            - How it improves upon the brute force
            - Time and Space complexity analysis
            - Complete C++ implementation with comments
            - Trade-offs made in this approach

            3. OPTIMAL APPROACH:
            - Detailed explanation of the optimal solution
            - Time and Space complexity analysis
            - Complete C++ implementation with comments
            - Why this is the best possible approach
            - Any edge cases to consider

            Problem to analyze:
            ${text}

            Format each solution with proper indentation and detailed comments for better understanding in JSON format.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            console.log(response.text());
            res.json(response.text());
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
