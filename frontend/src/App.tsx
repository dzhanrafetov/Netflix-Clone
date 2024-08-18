import { Navigate, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/home/HomePage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { userAuthStore } from "./store/authStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import SearchHistoryPage from "./pages/SearchHistoryPage"
function App() {
  const { user, isCheckingAuth, authCheck } = userAuthStore();

  useEffect(() => {
    authCheck(); // Invoke the authCheck function to check authentication
  }, [authCheck]); // Add authCheck to the dependency array to prevent issues

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />

        </div>

      </div>)
  }

  return (
    <>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />

        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />

      </Routes>
      <Footer />

      <Toaster />

    </>
  )
}

export default App
