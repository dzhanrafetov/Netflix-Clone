import { Request, Response } from "express";
import { fetchFromTMBD } from "../utils/tmbdUtil";
export async function getTrendingMovie(req: Request, res: Response) {
  try {
    const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
    res.json({ success: true, content: randomMovie })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" })
  }


}
export async function getMovieTrailers(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)

    res.status(200).json({ success: true, trailers: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
export async function getMovieDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)

    res.status(200).json({ success: true, content: data })

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}
export async function getSimilarMovies(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data })


  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}
export async function getMoviesByCategory(req: Request, res: Response) {
try {
  const{category}=req.params;
  const data=await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
  res.status(200).json({ success: true, content: data })

} catch (error) {
  res.status(500).json({ success: false, message: "Internal Server Error" })

}
}


