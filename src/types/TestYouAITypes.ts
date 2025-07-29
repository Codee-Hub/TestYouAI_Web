export interface Test{
    dificuldade: string
    numberOfQuestions: number
    questionList: Question[]
}

export interface Question {
    textQuestion: string
    wasAnswered: boolean
    optionList: Option []
}

export interface Option {
    textOption: string
    justification: string
    wasSelect: boolean
    isCorrect: boolean
}