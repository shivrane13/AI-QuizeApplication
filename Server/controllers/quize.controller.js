const History = require("../models/history.model");
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

async function getQuzie(req, res) {
  const Userprompt = req.body.prompt;
  const numOfQuestions = req.body.numberOfQuestions;
  console.log(Userprompt, numOfQuestions);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBUeqZtVCGmo0JIIUNEvw-F91ObxYPzXtw"
  );
  const schema = {
    description: "Quiz with a title, questions, options, and correct answers",
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description: "The title of the quiz",
        nullable: false,
      },
      questions: {
        type: SchemaType.ARRAY,
        description: "List of questions with options and correct answers",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description: "The question being answered",
              nullable: false,
            },
            options: {
              type: SchemaType.ARRAY,
              description:
                "Array of options for the question, must include 4 options",
              nullable: false,
              items: {
                type: SchemaType.STRING,
                description: "An option for the question",
              },
            },
            correctOption: {
              type: SchemaType.STRING,
              description:
                "Give the correct answer from options in formate('A','B','C','D')",
              nullable: false,
            },
            points: {
              type: SchemaType.INTEGER,
              description:
                "Points assigned to the question, minimum value of 5 depending on difficulty",
              minimum: 5,
            },
          },
          required: ["question", "options", "correctOption"],
        },
      },
    },
    required: ["title", "questions"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `create ${numOfQuestions} number of questions for ${Userprompt} `;

  const result = await model.generateContent(prompt);
  const data = JSON.parse(result.response.text());
  data.questions.map((question) => {
    switch (question.correctOption) {
      case "A":
        question.correctOption = 0;
        break;
      case "B":
        question.correctOption = 1;
        break;
      case "C":
        question.correctOption = 2;
        break;
      case "D":
        question.correctOption = 3;
        break;
      default:
        question.correctOption = 0;
    }
    return question;
  });
  res.json({ data: data });
}

async function createHistory(req, res) {
  try {
    const history = new History(req.body);
    let data;
    if (history.id == undefined) {
      [data] = await history.save();
    } else {
      data = await history.save();
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

async function getAllHistory(req, res) {
  const userId = req.session.user.id;
  const data = await History.getHistory(userId);
  res.json(data);
}

module.exports = {
  getQuzie: getQuzie,
  createHistory: createHistory,
  getAllHistory: getAllHistory,
};
