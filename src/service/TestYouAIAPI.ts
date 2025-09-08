import axios from 'axios';
import { Test, TestParams, LoginRequest, LoginResponse } from '@/types/TestYouAITypes'; 

const API_URL = 'http://localhost:8080';


export async function fetchTest(params : TestParams): Promise<Test> {
  const response = await axios.get<Test>(API_URL + '/tests', {
    params,
  });
  return response.data;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return response.data;
}
