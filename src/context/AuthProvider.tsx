import { useCallback, useMemo, useState, type ReactNode } from "react"
import { AuthContext, type User } from "./AuthContext"

const USER_KEY = "crumb-co:user"
const ACCOUNTS_KEY = "crumb-co:accounts"

type Account = {
  name: string
  email: string
  password?: string
  phone?: string
  city?: string
  address?: string
}

function accountToUser(account: Account): User {
  return {
    name: account.name,
    email: account.email,
    phone: account.phone,
    city: account.city,
    address: account.address,
  }
}

function readStoredUser(): User | null {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      const raw = storage.getItem(USER_KEY)
      if (raw) {
        return JSON.parse(raw) as User
      }
    } catch {
      // ignore malformed stored user
    }
  }
  return null
}

function readAccounts(): Record<string, Account> {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "{}") as Record<
      string,
      Account
    >
  } catch {
    return {}
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  const login = useCallback((email: string, remember: boolean) => {
    const account = readAccounts()[email.toLowerCase()]
    if (!account) {
      return null
    }
    const next = accountToUser(account)
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(USER_KEY, JSON.stringify(next))
    setUser(next)
    return next
  }, [])

  const register = useCallback(
    (name: string, email: string, password?: string) => {
      const accounts = readAccounts()
      accounts[email.toLowerCase()] = { name, email, password }
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
      const next: User = { name, email }
      localStorage.setItem(USER_KEY, JSON.stringify(next))
      setUser(next)
    },
    [],
  )

  const updateProfile = useCallback(
    (profile: Partial<User>) => {
      setUser((current) => {
        if (!current) {
          return current
        }
        const next: User = { ...current, ...profile }
        const accounts = readAccounts()
        const email = current.email.toLowerCase()
        accounts[email] = { ...accounts[email], ...profile }
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
        localStorage.setItem(USER_KEY, JSON.stringify(next))
        sessionStorage.setItem(USER_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const updatePassword = useCallback((password: string) => {
    setUser((current) => {
      if (!current) {
        return current
      }
      const accounts = readAccounts()
      const email = current.email.toLowerCase()
      accounts[email] = { ...accounts[email], password }
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
      return current
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, register, updateProfile, updatePassword, logout }),
    [user, login, register, updateProfile, updatePassword, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}