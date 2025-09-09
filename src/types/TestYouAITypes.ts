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

export interface TestParams  {
  theme: string;
  numberOfQuestions: number;
  level: string;
  userId? :number
};

export interface LoginRequest   {
  id?: number;
  name?: string;
  email?: string;
  password?: string; 
  phoneNumber?: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export type FieldError = {
  field: string;       // ex: "name", "password"
  message: string;     // mensagem amigável do backend
};

export type ApiError = {
  code?: number;          
  message: string;       
  field?: 'email' | 'password' | 'general';
  fieldWithErrors?: FieldError[]; // adicionamos aqui
};

export interface DecodedToken {
  sub: string;   
  scope: string; 
  exp: number;   
  iat: number;   
  iss?: string;   
};


