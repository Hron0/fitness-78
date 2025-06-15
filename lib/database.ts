import { supabase } from "./supabase"
import type { Trainer, Workout, Booking, ContactMessage } from "./supabase"

// Trainers/Coaches operations
export async function getTrainers(): Promise<Trainer[]> {
  try {
    console.log("Fetching trainers from coaches table...")

    const { data, error } = await supabase.from("coaches").select("*").order("name")

    if (error) {
      console.error("Error fetching trainers:", error)
      throw new Error(`Failed to fetch trainers: ${error.message}`)
    }

    console.log("Trainers fetched successfully:", data?.length || 0)
    return data || []
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getTrainerById(id: number): Promise<Trainer | null> {
  try {
    const { data, error } = await supabase.from("coaches").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching trainer:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

// Workouts operations
export async function getWorkouts(): Promise<Workout[]> {
  try {
    console.log("Fetching workouts...")

    const { data, error } = await supabase.from("workouts").select("*").order("title")

    if (error) {
      console.error("Error fetching workouts:", error)
      throw new Error(`Failed to fetch workouts: ${error.message}`)
    }

    console.log("Workouts fetched successfully:", data?.length || 0)

    // Manually fetch trainers for each workout
    const workoutsWithTrainers = await Promise.all(
      (data || []).map(async (workout) => {
        if (workout.trainer_id) {
          const trainer = await getTrainerById(workout.trainer_id)
          return { ...workout, trainer }
        }
        return { ...workout, trainer: null }
      }),
    )

    return workoutsWithTrainers
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getWorkoutById(id: number): Promise<Workout | null> {
  try {
    const { data, error } = await supabase.from("workouts").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching workout:", error)
      return null
    }

    // Manually fetch trainer if exists
    let trainer = null
    if (data.trainer_id) {
      trainer = await getTrainerById(data.trainer_id)
    }

    return { ...data, trainer }
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

// Bookings operations
export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  try {
    const { data, error } = await supabase.from("bookings").insert(booking).select().single()

    if (error) {
      console.error("Error creating booking:", error)
      throw new Error(`Failed to create booking: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getUserBookings(userId: number): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("booking_date", { ascending: false })

    if (error) {
      console.error("Error fetching user bookings:", error)
      throw new Error(`Failed to fetch bookings: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const { data, error } = await supabase.from("bookings").select("*").order("booking_date", { ascending: false })

    if (error) {
      console.error("Error fetching all bookings:", error)
      throw new Error(`Failed to fetch bookings: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Contact messages operations
export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "created_at" | "updated_at" | "status">,
): Promise<ContactMessage> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({ ...message, status: "new" })
      .select()
      .single()

    if (error) {
      console.error("Error creating contact message:", error)
      throw new Error(`Failed to send message: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact messages:", error)
      throw new Error(`Failed to fetch messages: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Debug function to check database tables
export async function checkDatabaseTables() {
  const tables = ["users", "coaches", "workouts", "bookings", "contact_messages"]
  const results: Record<string, any> = {}

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select("*").limit(1)
      results[table] = {
        exists: !error,
        error: error?.message,
        sampleData: data?.[0] || null,
      }
    } catch (err) {
      results[table] = {
        exists: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  console.log("Database tables check:", results)
  return results
}
