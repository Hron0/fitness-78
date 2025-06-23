"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Trainer } from "@/lib/supabase"
import { ImageUpload } from "./image-upload"

interface TrainerFormProps {
  trainer?: Trainer | null
  onSubmit: (data: Omit<Trainer, "id" | "created_at" | "updated_at">) => void
  onCancel: () => void
}

export function TrainerForm({ trainer, onSubmit, onCancel }: TrainerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience_years: 0,
    rating: 5,
    price_per_hour: 0,
    description: "",
    image_url: "",
  })

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        specialization: trainer.specialization,
        experience_years: trainer.experience_years,
        rating: trainer.rating,
        price_per_hour: trainer.price_per_hour,
        description: trainer.description || "",
        image_url: trainer.image_url || "",
      })
    }
  }, [trainer])

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
          <CardTitle className="text-white">{trainer ? "Редактировать тренера" : "Добавить тренера"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <ImageUpload currentImage={formData.image_url} onImageChange={handleImageChange} label="Фото тренера" />

            <div>
              <Label htmlFor="name" className="text-white">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="specialization" className="text-white">
                Специализация
              </Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience_years" className="text-white">
                  Опыт (лет)
                </Label>
                <Input
                  id="experience_years"
                  name="experience_years"
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={handleChange}
                  required
                  className="bg-[#2A2A2A] border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="rating" className="text-white">
                  Рейтинг
                </Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="bg-[#2A2A2A] border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price_per_hour" className="text-white">
                Цена за час (₽)
              </Label>
              <Input
                id="price_per_hour"
                name="price_per_hour"
                type="number"
                min="0"
                value={formData.price_per_hour}
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
                rows={4}
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-[#FF5E14] hover:bg-[#FF5E14]/90">
                {trainer ? "Обновить" : "Создать"}
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
