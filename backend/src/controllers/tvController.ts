import { Request, Response } from "express";
import { fetchFromTMBD } from "../utils/tmbdUtil";

export async function getTrendingTv(req: Request, res: Response) {
  try {
    const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

    res.status(200).json({
      success: true,
      content: randomMovie
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export async function getTvTrailers(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)

    res.status(200).json({ success: true, tvs: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
export async function getTvDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)

    res.status(200).json({ success: true, content: data })

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}

export async function getSimilarTvs(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data })


  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}
export async function getTvsByCategory(req: Request, res: Response) {
  try {
    const{category}=req.params;
    const data=await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data })

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
  }