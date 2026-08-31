import { createContext, useContext } from "react"

export type User = {
  name: string
  email: string
}

export type AuthContextValue = {
  user: User | null
  login: (email: string, remember: boolean) => User | null
  register: (name: string, email: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}