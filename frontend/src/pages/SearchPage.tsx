import { useState } from "react";
import { useContentStore } from "../store/content";
import NavBar from "../components/NavBar";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ORGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
interface MovieOrTVResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
}

interface PersonResult {
  id: number;
  name: string;
  profile_path: string | null;
}

type SearchResult = MovieOrTVResult | PersonResult;
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const { setContentType } = useContentStore();
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv")
    setResults([]);
  }
  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
      setResults(res.data.content)
    } catch (error) {
      toast.error("Nothing found")
    }
  }
  return <div className='bg-black min-h-screen text-white'>
    <NavBar />
    <div className='flex justify-center gap-3 mb-4'>
      <button
        className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
          } hover:bg-red-700`}
        onClick={() => handleTabClick("movie")}
      >
        Movies
      </button>

      <button
        className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
          } hover:bg-red-700`}
        onClick={() => handleTabClick("tv")}
      >
        TV Shows
      </button>


      <button
        className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"
          } hover:bg-red-700`}
        onClick={() => handleTabClick("person")}
      >
        Person
      </button>
    </div>
    <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>

      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={"Search for a " + activeTab}
        className='w-full p-2 rounded bg-gray-800 text-white'
      />
      <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
        <Search className='size-6' />
      </button>
    </form>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {results.map((result) => {
        // Type guard to check if result is a PersonResult
        const isPersonResult = (result: SearchResult): result is PersonResult => 'profile_path' in result;

        // Type guard to check if result is a MovieOrTVResult
        const isMovieOrTVResult = (result: SearchResult): result is MovieOrTVResult => 'poster_path' in result;

        if (activeTab === "person" && isPersonResult(result)) {
          // Render PersonResult if activeTab is "person" and result is of type PersonResult
          return result.profile_path ? (
            <div key={result.id} className="bg-gray-800 p-4 rounded">
              <div className='flex flex-col items-center'>
                <img
                  src={ORGINAL_IMG_BASE_URL + result.profile_path}
                  alt={result.name}
                  className='max-h-96 rounded mx-auto'
                />
                <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
              </div>
            </div>
          ) : null;
        } else if ((activeTab === "movie" || activeTab === "tv") && isMovieOrTVResult(result)) {
          // Render MovieOrTVResult if activeTab is "movie" or "tv" and result is of type MovieOrTVResult
          return result.poster_path ? (
            <div key={result.id} className="bg-gray-800 p-4 rounded">
              <Link
                to={"/watch/" + result.id}
                onClick={() => {
                  setContentType(activeTab);
                }}
              >
                <img
                  src={ORGINAL_IMG_BASE_URL + result.poster_path}
                  alt={result.title || result.name}
                  className='w-full h-auto rounded'
                />
                <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
              </Link>
            </div>
          ) : null;
        } else {
          // Return null if the result doesn't match the expected type or has no image path
          return null;
        }
      })}
    </div>
  </div>
}
export default SearchPage;