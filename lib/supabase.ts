import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для базы данных
export interface Trainer {
  id: string
  name: string
  specialization: string
  experience: number
  description: string
  image_url: string
  rating: number
  price_per_hour: number
  created_at: string
}

export interface Workout {
  id: string
  title: string
  description: string
  duration: number
  difficulty: string
  category: string
  image_url: string
  trainer_id: string
  created_at: string
  trainer?: Trainer
}

export interface Booking {
  id: string
  user_id: string
  trainer_id: string
  workout_id: string
  booking_date: string
  booking_time: string
  status: string
  created_at: string
  trainer?: Trainer
  workout?: Workout
}

export interface User {
  id: string
  email: string
  name: string
  phone: string
  membership_type: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: string
  created_at: string
}
