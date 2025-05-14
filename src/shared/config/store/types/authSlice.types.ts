export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
  
export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface RegisterRequest {
    id?: string;
    name?: string;
    email: string;
    password: string;
    country?: string;
    birthDate?: string;
    tagName?: string;
    role?: 'ACTIVE' | 'INACTIVE';
    enabled?: boolean;
}