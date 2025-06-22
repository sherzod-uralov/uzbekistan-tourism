import { apiClient } from "@/lib/axios"
import type { AuthResponse, LoginData, RegisterData, User } from "@/types"

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data)
    return response.data
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>("/users/profile")
    return response.data
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>("/users/profile", data)
    return response.data
  },

  logout() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token")
  },

  setToken(token: string): void {
    localStorage.setItem("auth_token", token)
  },

  getUser(): User | null {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user))
  },
}
