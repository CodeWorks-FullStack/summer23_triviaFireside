import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCurrentQuestion() {
  console.log('do I ever run?');
  let firstQuestion = AppState.questions[0]

  setHTML('currentQuestion', firstQuestion.CurrentTemplate)
}

export class QuestionsController {
  constructor () {
    console.log('q controller loaded');
    this.getQuestions()
    // _drawCurrentQuestion()
    AppState.on('questions', _drawCurrentQuestion)
  }

  async getQuestions() {
    try {
      await questionsService.getQuestions()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  guessAnswer(userAnswer) {
    questionsService.guessAnswer(userAnswer)
  }
}