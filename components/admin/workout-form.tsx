"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Workout, Trainer } from "@/lib/supabase"
import { ImageUpload } from "./image-upload"

interface WorkoutFormProps {
  workout?: Workout | null
  trainers: Trainer[]
  onSubmit: (data: Omit<Workout, "id" | "created_at" | "updated_at">) => void
  onCancel: () => void
}

export function WorkoutForm({ workout, trainers, onSubmit, onCancel }: WorkoutFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 60,
    difficulty: "Начинающий",
    category: "Силовая",
    trainer_id: 0,
    image_url: "",
  })

  useEffect(() => {
    if (workout) {
      setFormData({
        title: workout.title,
        description: workout.description,
        duration: workout.duration,
        difficulty: workout.difficulty,
        category: workout.category || "Силовая",
        trainer_id: workout.trainer_id || 0,
        image_url: workout.image_url || "",
      })
    }
  }, [workout])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "trainer_id" ? Number(value) : value,
    }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: imageUrl,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#1E1E1E] border-none w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">{workout ? "Редактировать тренировку" : "Добавить тренировку"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <ImageUpload
              currentImage={formData.image_url}
              onImageChange={handleImageChange}
              label="Изображение тренировки"
            />

            <div>
              <Label htmlFor="title" className="text-white">
                Название
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Описание
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-white">
                  Длительность (мин)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="15"
                  max="180"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="bg-[#2A2A2A] border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="trainer_id" className="text-white">
                  Тренер
                </Label>
                <Select
                  value={formData.trainer_id.toString()}
                  onValueChange={(value) => handleSelectChange("trainer_id", value)}
                >
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                    <SelectValue placeholder="Выберите тренера" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id.toString()}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty" className="text-white">
                  Сложность
                </Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleSelectChange("difficulty", value)}>
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Начинающий">Начинающий</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Продвинутый">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category" className="text-white">
                  Категория
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Силовая">Силовая</SelectItem>
                    <SelectItem value="Кардио">Кардио</SelectItem>
                    <SelectItem value="Йога">Йога</SelectItem>
                    <SelectItem value="Функциональная">Функциональная</SelectItem>
                    <SelectItem value="Бокс">Бокс</SelectItem>
                    <SelectItem value="Пилатес">Пилатес</SelectItem>
                    <SelectItem value="Кроссфит">Кроссфит</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-[#FF5E14] hover:bg-[#FF5E14]/90">
                {workout ? "Обновить" : "Создать"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
