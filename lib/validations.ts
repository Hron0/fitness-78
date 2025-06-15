import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
})

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().optional(),
  trainerId: z.number().min(1, "Выберите тренера"),
  workoutId: z.number().min(1, "Выберите тренировку"),
  date: z.date({
    required_error: "Выберите дату",
  }),
  time: z.string().min(1, "Выберите время"),
})

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    phone: z.string().optional(),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export const loginFormSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type RegisterFormData = z.infer<typeof registerFormSchema>
export type LoginFormData = z.infer<typeof loginFormSchema>
