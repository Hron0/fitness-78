import { supabase } from "./supabase"
import type { Trainer, Workout, Booking, ContactMessage, UserMessage } from "./supabase"

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

// Check if required database tables exist
export async function checkDatabaseTables(): Promise<void> {
  try {
    console.log("🔍 Checking database tables...")

    // Check if coaches table exists and has data
    const { data: coachesData, error: coachesError } = await supabase
      .from("coaches")
      .select("count", { count: "exact", head: true })

    if (coachesError) {
      throw new Error(`Coaches table error: ${coachesError.message}`)
    }

    // Check if workouts table exists
    const { data: workoutsData, error: workoutsError } = await supabase
      .from("workouts")
      .select("count", { count: "exact", head: true })

    if (workoutsError) {
      throw new Error(`Workouts table error: ${workoutsError.message}`)
    }

    // Check if contact_messages table exists
    const { data: messagesData, error: messagesError } = await supabase
      .from("contact_messages")
      .select("count", { count: "exact", head: true })

    if (messagesError) {
      throw new Error(`Contact messages table error: ${messagesError.message}`)
    }

    console.log("✅ All required database tables exist")
  } catch (error) {
    console.error("❌ Database tables check failed:", error)
    throw new Error(`Database tables check failed: ${error instanceof Error ? error.message : "Unknown error"}`)
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
      experience_years: coach.experience_years,
      experience: coach.experience_years, // Map experience_years to experience for compatibility
      rating: coach.rating,
      price_per_hour: coach.price_per_hour,
      description: coach.description,
      image_url: coach.image_url,
      created_at: coach.created_at,
      updated_at: coach.updated_at,
    }))

    console.log(`✅ Successfully fetched ${trainers.length} trainers`)
    return trainers
  } catch (error) {
    console.error("❌ Error in getTrainers:", error)
    throw new Error(`Failed to fetch trainers: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Get all workouts
export async function getWorkouts(): Promise<Workout[]> {
  try {
    console.log("📊 Fetching workouts...")

    // Get workouts first
    const { data: workoutsData, error: workoutsError } = await supabase.from("workouts").select("*").order("title")

    if (workoutsError) {
      console.error("❌ Error fetching workouts:", workoutsError.message)
      throw new Error(`Failed to fetch workouts: ${workoutsError.message}`)
    }

    if (!workoutsData) {
      console.log("⚠️ No workouts found")
      return []
    }

    // Get coaches separately
    const { data: coachesData, error: coachesError } = await supabase.from("coaches").select("*")

    if (coachesError) {
      console.warn("⚠️ Could not fetch coaches:", coachesError.message)
    }

    // Map workouts and attach trainer data if available
    const workouts: Workout[] = workoutsData.map((workout) => {
      // Find the trainer for this workout
      const trainer = coachesData?.find((coach) => coach.id === workout.trainer_id)

      return {
        id: workout.id,
        title: workout.title,
        description: workout.description,
        duration: workout.duration,
        difficulty: workout.difficulty,
        category: workout.category,
        trainer_id: workout.trainer_id,
        image_url: workout.image_url,
        created_at: workout.created_at,
        updated_at: workout.updated_at,
        trainer: trainer
          ? {
              id: trainer.id,
              name: trainer.name,
              specialization: trainer.specialization,
              experience_years: trainer.experience_years,
              experience: trainer.experience_years,
              rating: trainer.rating,
              price_per_hour: trainer.price_per_hour,
              description: trainer.description,
              image_url: trainer.image_url,
              created_at: trainer.created_at,
              updated_at: trainer.updated_at,
            }
          : null,
      }
    })

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
          user_id: booking.user_id,
          trainer_id: booking.trainer_id,
          workout_id: booking.workout_id,
          booking_date: booking.booking_date,
          booking_time: booking.booking_time,
          status: booking.status || "pending",
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

// Get bookings for a specific user
export async function getUserBookings(userId: number): Promise<Booking[]> {
  try {
    console.log(`📊 Fetching bookings for user ${userId}...`)

    const { data: bookingsData, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("booking_date", { ascending: false })

    if (bookingsError) {
      console.error("❌ Error fetching bookings:", bookingsError.message)
      throw new Error(`Failed to fetch bookings: ${bookingsError.message}`)
    }

    if (!bookingsData) {
      console.log("⚠️ No bookings found")
      return []
    }

    // Get trainers and workouts to populate booking details
    const [trainersData, workoutsData] = await Promise.all([
      supabase.from("coaches").select("*"),
      supabase.from("workouts").select("*"),
    ])

    // Map bookings with trainer and workout details
    const bookings: Booking[] = bookingsData.map((booking) => {
      const trainer = trainersData.data?.find((t) => t.id === booking.trainer_id)
      const workout = workoutsData.data?.find((w) => w.id === booking.workout_id)

      return {
        ...booking,
        trainer: trainer
          ? {
              id: trainer.id,
              name: trainer.name,
              specialization: trainer.specialization,
              experience_years: trainer.experience_years,
              experience: trainer.experience_years,
              rating: trainer.rating,
              price_per_hour: trainer.price_per_hour,
              description: trainer.description,
              image_url: trainer.image_url,
              created_at: trainer.created_at,
              updated_at: trainer.updated_at,
            }
          : undefined,
        workout: workout
          ? {
              id: workout.id,
              title: workout.title,
              description: workout.description,
              duration: workout.duration,
              difficulty: workout.difficulty,
              category: workout.category,
              trainer_id: workout.trainer_id,
              image_url: workout.image_url,
              created_at: workout.created_at,
              updated_at: workout.updated_at,
            }
          : undefined,
      }
    })

    console.log(`✅ Successfully fetched ${bookings.length} bookings`)
    return bookings
  } catch (error) {
    console.error("❌ Error in getUserBookings:", error)
    throw new Error("Failed to fetch user bookings")
  }
}

// Create a user message to admin
export async function createUserMessage(
  message: Omit<UserMessage, "id" | "created_at" | "updated_at" | "status">,
): Promise<UserMessage> {
  try {
    const { data, error } = await supabase
      .from("user_messages")
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
      throw new Error(`Failed to create user message: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error creating user message:", error)
    throw error
  }
}

// Get user messages for a specific user
export async function getUserMessages(userId: number): Promise<UserMessage[]> {
  try {
    console.log(`📊 Fetching user messages for user ${userId}...`)

    const { data, error } = await supabase
      .from("user_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching user messages:", error.message)
      throw new Error(`Failed to fetch user messages: ${error.message}`)
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} user messages`)
    return data || []
  } catch (error) {
    console.error("❌ Error in getUserMessages:", error)
    throw new Error("Failed to fetch user messages")
  }
}

// Get all user messages for admin dashboard
export async function getAllUserMessages(): Promise<UserMessage[]> {
  try {
    console.log("📊 Fetching all user messages for admin...")

    const { data, error } = await supabase
      .from("user_messages")
      .select("*, user:users(name, email)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching all user messages:", error.message)
      throw new Error(`Failed to fetch all user messages: ${error.message}`)
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} user messages`)
    return data || []
  } catch (error) {
    console.error("❌ Error in getAllUserMessages:", error)
    throw new Error("Failed to fetch all user messages")
  }
}

// Update user message status
export async function updateUserMessageStatus(messageId: number, status: "new" | "read"): Promise<void> {
  try {
    const { error } = await supabase
      .from("user_messages")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", messageId)

    if (error) {
      throw new Error(`Failed to update user message status: ${error.message}`)
    }

    console.log(`✅ Successfully updated user message ${messageId} status to ${status}`)
  } catch (error) {
    console.error("❌ Error in updateUserMessageStatus:", error)
    throw error
  }
}
