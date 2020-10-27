import { type } from "os";
import {shuffleArray} from './utils'

export type Question={
  category:string;
  correct_answer:string;
  difficulity:string;
  incorrect_answers:string[];
  question:string;
  type:string
}

export type QuestionState = Question & {answers:string[]}


export enum Difficulity{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}

export const fetchQuizQuestions = async(amount:number,difficulity:Difficulity)=>{
  const endppoint = `https://opentdb.com/api.php?amount=${amount}&difficulity=${difficulity}&type=multiple`;
  const data = await(await fetch(endppoint)).json();
  return data.results.map((question:Question)=>(
    {
      ...question,
      answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
    }
  ))
}