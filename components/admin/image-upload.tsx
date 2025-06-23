"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  label: string
  accept?: string
}

export function ImageUpload({ currentImage, onImageChange, label, accept = "image/*" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(currentImage || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Convert file to base64 for storage (in a real app, you'd upload to a service)
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        // For demo purposes, we'll use the base64 data URL
        // In production, you'd upload to a service like Supabase Storage, AWS S3, etc.
        onImageChange(base64)
        setUploading(false)

        toast({
          title: "Изображение загружено",
          description: "Изображение успешно загружено",
        })
      }
      reader.onerror = () => {
        setUploading(false)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить изображение",
          variant: "destructive",
        })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setUploading(false)
      console.error("Error uploading image:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      })
    }
  }

  const handleRemoveImage = () => {
    setPreview("")
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>

      {preview ? (
        <div className="relative">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
          onClick={handleButtonClick}
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-400 text-sm text-center">
            Нажмите для загрузки изображения
            <br />
            <span className="text-xs">Максимум 5MB</span>
          </p>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Загрузка..." : "Выбрать файл"}
        </Button>

        {preview && (
          <Button type="button" variant="ghost" onClick={handleRemoveImage} className="text-red-400 hover:text-red-300">
            Удалить
          </Button>
        )}
      </div>
    </div>
  )
}
