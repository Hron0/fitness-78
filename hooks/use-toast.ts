"use client"

import { toast } from "sonner"

// Create a wrapper to maintain compatibility with existing code
export function useToast() {
  return {
    toast: (props: {
      title?: string
      description?: string
      variant?: "default" | "destructive"
    }) => {
      if (props.variant === "destructive") {
        toast.error(props.title || "Error", {
          description: props.description,
        })
      } else {
        toast.success(props.title || "Success", {
          description: props.description,
        })
      }
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        toast.dismiss(toastId)
      } else {
        toast.dismiss()
      }
    },
  }
}

// Export the original toast for direct usage
export { toast }
