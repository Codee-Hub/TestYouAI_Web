import axios from 'axios';
import { Test, TestParams } from '../types/TestYouAITypes'; 

export async function fetchTest(params : TestParams): Promise<Test> {
  const response = await axios.get<Test>('http://localhost:8080/tests', {
    params,
  });
  return response.data;
}
