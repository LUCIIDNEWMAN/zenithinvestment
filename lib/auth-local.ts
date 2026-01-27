// Local authentication utility for development/preview environment
// This can be switched to Supabase in production

interface User {
  id: string
  email: string
  full_name: string
  created_at: string
}

interface AuthResponse {
  user: User | null
  error: Error | null
}

// In-memory user database for demo (in production, use Supabase)
const users: { [key: string]: { password: string; user: User } } = {
  "demo@zenith.com": {
    password: "demo1234", // hashed in production
    user: {
      id: "demo-user-1",
      email: "demo@zenith.com",
      full_name: "Demo User",
      created_at: new Date().toISOString(),
    },
  },
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  referralCode?: string
): Promise<AuthResponse> {
  try {
    // Validate inputs
    if (!email || !password || !fullName) {
      return { user: null, error: new Error("Missing required fields") }
    }

    if (password.length < 8) {
      return { user: null, error: new Error("Password must be at least 8 characters") }
    }

    // Check if user already exists
    if (users[email]) {
      return { user: null, error: new Error("Email already in use") }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      full_name: fullName,
      created_at: new Date().toISOString(),
    }

    users[email] = {
      password, // In production, this should be hashed
      user: newUser,
    }

    // Store session
    const sessionToken = btoa(`${email}:${Date.now()}`)
    localStorage.setItem("auth_token", sessionToken)
    localStorage.setItem("user_id", newUser.id)
    localStorage.setItem("user_email", email)
    localStorage.setItem("user_name", fullName)
    localStorage.setItem("isSignedIn", "true")

    return { user: newUser, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find user
    const userRecord = users[email]
    if (!userRecord) {
      return { user: null, error: new Error("Invalid email or password") }
    }

    // Verify password
    if (userRecord.password !== password) {
      return { user: null, error: new Error("Invalid email or password") }
    }

    // Store session
    const sessionToken = btoa(`${email}:${Date.now()}`)
    localStorage.setItem("auth_token", sessionToken)
    localStorage.setItem("user_id", userRecord.user.id)
    localStorage.setItem("user_email", email)
    localStorage.setItem("user_name", userRecord.user.full_name)
    localStorage.setItem("isSignedIn", "true")

    return { user: userRecord.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export async function signOut(): Promise<void> {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user_id")
  localStorage.removeItem("user_email")
  localStorage.removeItem("user_name")
  localStorage.removeItem("isSignedIn")
}

export async function getUser(): Promise<User | null> {
  try {
    const email = localStorage.getItem("user_email")
    if (!email || !users[email]) {
      return null
    }
    return users[email].user
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("isSignedIn") === "true"
}
