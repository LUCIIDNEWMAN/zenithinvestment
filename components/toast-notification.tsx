"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ToastType = "success" | "error" | "warning"

interface ToastProps {
  type: ToastType
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ type, message, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const Icon = icons[type]

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className={`flex items-center p-4 border rounded-lg shadow-lg max-w-md ${colors[type]}`}>
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 hover:bg-black/10" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{
    type: ToastType
    message: string
    isVisible: boolean
  }>({
    type: "success",
    message: "",
    isVisible: false,
  })

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message, isVisible: true })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}
