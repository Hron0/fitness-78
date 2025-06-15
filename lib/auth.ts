import { supabase, type AuthUser, type LoginCredentials, type RegisterData } from "./supabase"
import bcrypt from "bcryptjs"

export class AuthService {
  // Register new user
  static async register(data: RegisterData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase.from("users").select("email").eq("email", data.email).single()

      if (existingUser) {
        return { user: null, error: "Пользователь с таким email уже существует" }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10)

      // Insert new user
      const { data: newUser, error } = await supabase
        .from("users")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          role: "user",
        })
        .select("id, name, email, phone, role")
        .single()

      if (error) {
        return { user: null, error: "Ошибка при создании пользователя" }
      }

      return { user: newUser as AuthUser, error: null }
    } catch (error) {
      console.error("Registration error:", error)
      return { user: null, error: "Произошла ошибка при регистрации" }
    }
  }

  // Login user
  static async login(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Get user with password
      const { data: user, error } = await supabase
        .from("users")
        .select("id, name, email, phone, role, password")
        .eq("email", credentials.email)
        .single()

      if (error || !user) {
        return { user: null, error: "Неверный email или пароль" }
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, user.password!)

      if (!isValidPassword) {
        return { user: null, error: "Неверный email или пароль" }
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user
      return { user: userWithoutPassword as AuthUser, error: null }
    } catch (error) {
      console.error("Login error:", error)
      return { user: null, error: "Произошла ошибка при входе" }
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null

    try {
      const userStr = localStorage.getItem("fitness_user")
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  // Save user to localStorage
  static saveUser(user: AuthUser): void {
    if (typeof window === "undefined") return
    localStorage.setItem("fitness_user", JSON.stringify(user))
  }

  // Remove user from localStorage
  static logout(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem("fitness_user")
  }

  // Check if user is admin
  static isAdmin(user: AuthUser | null): boolean {
    return user?.role === "admin"
  }
}
