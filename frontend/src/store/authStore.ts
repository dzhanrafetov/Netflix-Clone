import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

// Define the user interface
//Move it to shared
interface IUser {
  id: string;
  username: string;
  email: string;
  image?: string;
  searchHistory?: string[];
}

// Define the credentials for signup and login
interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

// Define the state and actions in the store
interface AuthState {
  user: IUser | null;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isCheckingAuth: boolean;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login:  (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
}

// Create the Zustand store with the AuthState interface
export const userAuthStore = create<AuthState>((set) => ({

  user: null,

  isSigningIn: false,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  signup: async (credentials: SignupCredentials) => {
    
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
      set({ isSigningUp: false });
    }
  },
  login: async (credentials: SignupCredentials) => {
    set({ isSigningIn: true })
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isSigningIn: false });
      toast.success("You logged in successfully!");

    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
      set({ isSigningIn: false });
    }

    // Implement login logic here
  },
  logout: async () => {
    set({ isLoggingOut: true })

    try {
      // Implement logout logic here
      await axios.post("/api/v1/auth/logout")
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully")
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response?.data?.message || "Logout failed");
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
