import { supabase } from "./supabase"
import type { Trainer, Workout, Booking, ContactMessage } from "./supabase"

// Debug function to check database connection and tables
export async function debugDatabase() {
  try {
    console.log("🔍 Testing database connection...")

    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("coaches")
      .select("count", { count: "exact", head: true })

    if (connectionError) {
      console.error("❌ Database connection failed:", connectionError)
      return false
    }

    console.log("✅ Database connection successful")
    return true
  } catch (error) {
    console.error("❌ Database debug failed:", error)
    return false
  }
}

// Get all trainers/coaches
export async function getTrainers(): Promise<Trainer[]> {
  try {
    console.log("📊 Fetching trainers from coaches table...")

    const { data, error } = await supabase.from("coaches").select("*").order("name")

    if (error) {
      console.error("❌ Error fetching from coaches table:", error.message)
      throw new Error(`Failed to fetch trainers: ${error.message}`)
    }

    if (!data) {
      console.log("⚠️ No trainers found")
      return []
    }

    // Map coaches data to trainer interface
    const trainers: Trainer[] = data.map((coach) => ({
      id: coach.id,
      name: coach.name,
      specialization: coach.specialization,
      experience: coach.experience_years, // Map experience_years to experience
      rating: coach.rating,
      price_per_hour: coach.price_per_hour,
      description: coach.description,
      created_at: coach.created_at,
      updated_at: coach.updated_at,
    }))

    console.log(`✅ Successfully fetched ${trainers.length} trainers`)
    return trainers
  } catch (error) {
    console.error("❌ Error in getTrainers:", error)
    throw new Error("Failed to fetch trainers")
  }
}

// Get all workouts
export async function getWorkouts(): Promise<Workout[]> {
  try {
    console.log("📊 Fetching workouts...")

    // First try to get workouts with trainer relationship
    const { data, error } = await supabase
      .from("workouts")
      .select(`
        *,
        coach:coaches(*)
      `)
      .order("title")

    if (error) {
      console.error("❌ Error fetching workouts with relationship:", error.message)

      // Fallback: get workouts without relationship
      const { data: fallbackData, error: fallbackError } = await supabase.from("workouts").select("*").order("title")

      if (fallbackError) {
        throw new Error(`Failed to fetch workouts: ${fallbackError.message}`)
      }

      // Get coaches separately and map them
      const { data: coaches } = await supabase.from("coaches").select("*")

      const workouts: Workout[] = (fallbackData || []).map((workout) => {
        const trainer = coaches?.find((coach) => coach.id === workout.coach_id)
        return {
          ...workout,
          trainer: trainer
            ? {
                id: trainer.id,
                name: trainer.name,
                specialization: trainer.specialization,
                experience: trainer.experience_years,
                rating: trainer.rating,
                price_per_hour: trainer.price_per_hour,
                description: trainer.description,
                created_at: trainer.created_at,
                updated_at: trainer.updated_at,
              }
            : undefined,
        }
      })

      console.log(`✅ Successfully fetched ${workouts.length} workouts (fallback)`)
      return workouts
    }

    if (!data) {
      console.log("⚠️ No workouts found")
      return []
    }

    // Map the data to ensure proper structure
    const workouts: Workout[] = data.map((workout) => ({
      ...workout,
      trainer: workout.coach
        ? {
            id: workout.coach.id,
            name: workout.coach.name,
            specialization: workout.coach.specialization,
            experience: workout.coach.experience_years,
            rating: workout.coach.rating,
            price_per_hour: workout.coach.price_per_hour,
            description: workout.coach.description,
            created_at: workout.coach.created_at,
            updated_at: workout.coach.updated_at,
          }
        : undefined,
    }))

    console.log(`✅ Successfully fetched ${workouts.length} workouts`)
    return workouts
  } catch (error) {
    console.error("❌ Error in getWorkouts:", error)
    throw new Error("Failed to fetch workouts")
  }
}

// Create a new booking
export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          ...booking,
          coach_id: booking.trainer_id, // Map trainer_id to coach_id for database
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create booking: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

// Create a contact message
export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "created_at" | "updated_at" | "status">,
): Promise<ContactMessage> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          ...message,
          status: "new",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create contact message: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error creating contact message:", error)
    throw error
  }
}
