import { supabase } from "./supabase"
import type { Trainer, Workout, Booking, ContactMessage } from "./supabase"

// Trainers/Coaches operations
export async function getTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase.from("coaches").select("*").order("name")

  if (error) {
    console.error("Error fetching trainers:", error)
    throw new Error("Failed to fetch trainers")
  }

  return data || []
}

export async function getTrainerById(id: number): Promise<Trainer | null> {
  const { data, error } = await supabase.from("coaches").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching trainer:", error)
    return null
  }

  return data
}

// Workouts operations
export async function getWorkouts(): Promise<Workout[]> {
  const { data, error } = await supabase
    .from("workouts")
    .select(`
      *,
      trainer:coaches(*)
    `)
    .order("title")

  if (error) {
    console.error("Error fetching workouts:", error)
    throw new Error("Failed to fetch workouts")
  }

  return data || []
}

export async function getWorkoutById(id: number): Promise<Workout | null> {
  const { data, error } = await supabase
    .from("workouts")
    .select(`
      *,
      trainer:coaches(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching workout:", error)
    return null
  }

  return data
}

// Bookings operations
export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert(booking)
    .select(`
      *,
      trainer:coaches(*),
      workout:workouts(*),
      user:users(*)
    `)
    .single()

  if (error) {
    console.error("Error creating booking:", error)
    throw new Error("Failed to create booking")
  }

  return data
}

export async function getUserBookings(userId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      trainer:coaches(*),
      workout:workouts(*)
    `)
    .eq("user_id", userId)
    .order("booking_date", { ascending: false })

  if (error) {
    console.error("Error fetching user bookings:", error)
    throw new Error("Failed to fetch bookings")
  }

  return data || []
}

export async function getAllBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      trainer:coaches(*),
      workout:workouts(*),
      user:users(*)
    `)
    .order("booking_date", { ascending: false })

  if (error) {
    console.error("Error fetching all bookings:", error)
    throw new Error("Failed to fetch bookings")
  }

  return data || []
}

// Contact messages operations
export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "created_at" | "updated_at" | "status">,
): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert({ ...message, status: "new" })
    .select()
    .single()

  if (error) {
    console.error("Error creating contact message:", error)
    throw new Error("Failed to send message")
  }

  return data
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact messages:", error)
    throw new Error("Failed to fetch messages")
  }

  return data || []
}
