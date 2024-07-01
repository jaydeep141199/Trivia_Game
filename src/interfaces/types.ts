export default interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answersArray: string[];
}
export interface ResultProps {
  rightanswer: number;
  wronganswer: number;
}
