import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";
import { Pop } from "../utils/Pop.js";
import { triviaApi } from "./AxiosService.js"

class QuestionsService {
  guessAnswer(userAnswer) {
    let question = AppState.questions[0]
    if (userAnswer == question.correctAnswer) {
      Pop.success('You got it right!')
    }
    else {
      Pop.error("You got it wrong!")
    }

    AppState.questions.shift()

    AppState.emit('questions')
  }
  async getQuestions() {
    const res = await triviaApi.get('?amount=10&type=multiple')
    console.log('got questions', res.data);

    const realQuestions = res.data.results.map(questionPojo => new Question(questionPojo))
    AppState.questions = realQuestions
  }

}

export const questionsService = new QuestionsService()