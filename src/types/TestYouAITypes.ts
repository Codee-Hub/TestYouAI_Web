export interface Test{
    theme:string
    level: string
    numberOfQuestions: number
    wasAnswered: boolean
    questionList: Question[]
}

export interface Question {
    textQuestion: string
    optionList: Option []
}

export interface Option {
    textOption: string
    justification: string
    wasSelect: boolean
    isCorrect: boolean
}

export type TestParams = {
  theme: string;
  numberOfQuestions: number;
  level: string;
};