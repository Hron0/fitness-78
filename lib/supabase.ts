import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types matching the actual schema
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: "user" | "admin"
  password?: string
  created_at: string
  updated_at: string
}

export interface Trainer {
  id: number
  name: string
  specialization: string
  description: string
  experience_years: number // Note: using experience_years to match DB schema
  experience?: number // Computed property for backward compatibility
  rating: number
  price_per_hour: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Workout {
  id: number
  title: string
  description: string
  duration: number
  difficulty: string
  category?: string
  trainer_id?: number
  trainer?: Trainer | null
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  user_id: number
  trainer_id?: number
  workout_id?: number
  booking_date: string
  booking_time?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
  user?: User
  trainer?: Trainer
  workout?: Workout
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  status: "new" | "read" | "replied"
  created_at: string
  updated_at: string
}

// Auth types
export interface AuthUser {
  id: number
  name: string
  email: string
  phone?: string
  role: "user" | "admin"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone?: string
  password: string
}
