export class Question {
  constructor (data) {
    this.category = data.category
    this.difficulty = data.difficulty
    this.question = data.question
    this.correctAnswer = data.correct_answer
    this.incorrectAnswers = data.incorrect_answers
  }

  get CurrentTemplate() {
    return `
    <div class="col-12 mt-3 text-center">
      <h1>${this.category}</h1>
      <h2>${this.question}</h2>
      <h3>${this.difficulty}</h3>
      <div>
          ${this.ComputeQuestionButtons}
      </div>
    </div>
    `
  }

  get ComputeQuestionButtons() {
    let template = ''

    let randomIndex = Math.floor(Math.random() * (this.incorrectAnswers.length + 1))

    this.incorrectAnswers.splice(randomIndex, 0, this.correctAnswer)

    // this.incorrectAnswers.forEach(answer => template += `
    // <button class="btn ${answer == this.correctAnswer ? 'btn-danger fs-1' : 'btn-success'}">${answer}</button>
    // `);
    this.incorrectAnswers.forEach(answer => template += `
    <button onclick="app.QuestionsController.guessAnswer('${answer}')" class="btn btn-danger">${answer}</button>
    `);

    return template
  }

}