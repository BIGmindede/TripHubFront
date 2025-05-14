import { api } from 'shared/config/store/http';
import { LoginRequest, RegisterRequest } from "../types/authSlice.types";

export const authApi = {
  register: (profileData: RegisterRequest) => 
    api.post('/auth/register', profileData),

  login: (credentials: LoginRequest) =>
    api.post('/auth/login', credentials),

  refresh: () => 
    api.get('/auth/refresh'),

  logout: () => 
    api.get('/auth/logout'),
};