import axios from 'axios';
import { Test, TestParams, LoginRequest, LoginResponse } from '@/types/TestYouAITypes'; 


const API_URL = 'http://localhost:8080';

export async function fetchTest(params: TestParams): Promise<Test> {

  const response = await axios.post<Test>(`${API_URL}/tests`, params);

  return response.data;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return response.data;
}

export async function registerUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post(`${API_URL}/users`, data);
  return response.data;
}

export async function fetchUserById(userId: number, token: string): Promise<LoginRequest> {
  const response = await axios.get<LoginRequest>(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateUser(userId: number, data: LoginRequest, token: string): Promise<LoginRequest> {
  const response = await axios.put<LoginRequest>(`${API_URL}/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export async function fetchTestsByUser(token: string): Promise<Test[]> {
  const response = await axios.get<Test[]>(`${API_URL}/tests/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}



