import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { useContentStore } from "../store/content";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = userAuthStore();
  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const handleSetContentType = (type:any) => {
    setContentType(type);
    toggleMobileMenu(); // Close the mobile menu after clicking
  };

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to="/">
          <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40" />
        </Link>
        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to="/" className="hover:underline" onClick={() => handleSetContentType("movie")}>
            Movies
          </Link>
          <Link to="/" className="hover:underline" onClick={() => handleSetContentType("tv")}>
            Tv Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img src={user?.image} alt="User Avatar" className="h-8 rounded cursor-pointer" />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
          <Link to="/" className="block hover:underline p-2" onClick={() => handleSetContentType("movie")}>
            Movies
          </Link>
          <Link to="/" className="block hover:underline p-2" onClick={() => handleSetContentType("tv")}>
            Tv Shows
          </Link>
          <Link to="/history" className="block hover:underline p-2" onClick={() => console.log("Search History clicked")}>
            Search History
          </Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
