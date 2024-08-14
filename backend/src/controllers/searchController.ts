import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { fetchFromTMBD } from "../utils/tmbdUtil";
import { CustomRequest } from "../middlewares/protectRoute";



export async function searchPerson(req: Request, res: Response) {

  const { query } = req.params;
  const user = (req as CustomRequest).user; // Access user from req.user (custom property)

  try {
    const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    if (!user) {
      return res.status(404).send({ success: true, message: "User is undefined" });

    }

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: Date.now()
        }
      }
    })
    res.status(200).json({ success: true, content: response.results })
  } catch (error) {
    console.log("Error in search Person Controller")

    res.status(500).json({ success: false, message: "Internal Server Error" })

  }

}

export async function searchMovie(req: Request, res: Response) {

  const { query } = req.params;
  const user = (req as CustomRequest).user; // Access user from req.user (custom property)

  try {
    const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    if (!user) {
      return res.status(404).send({ success: true, message: "User is undefined" });

    }

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: Date.now()
        }
      }
    })
    res.status(200).json({ success: true, content: response.results })
  } catch (error) {
    console.log("Error in search Movie Controller")
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }


}


export async function searchTv(req: Request, res: Response) {

  const { query } = req.params;
  const user = (req as CustomRequest).user; // Access user from req.user (custom property)

  try {
    const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    if (!user) {
      return res.status(404).send({ success: true, message: "User is undefined" });

    }

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          createdAt: Date.now()
        }
      }
    })
    res.status(200).json({ success: true, content: response.results })
  } catch (error) {

    console.log("Error in search Tv Controller")
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}
export async function getSearchHistory(req: Request, res: Response) {
  const user = (req as CustomRequest).user; // Access user from req.user (custom property)

  try {
    if (!user) {
      return res.status(404).send({ success: true, message: "User is undefined" });

    }
    res.status(200).json({ success: true, content: user.searchHistory })
  } catch (error) {
    console.log("Error in getSearchHistory Controller")
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }
}
export async function removeItemFromSearchHistory(req: Request, res: Response) {
  const { id } = req.params  ;
  const user = (req as CustomRequest).user; // Access user from req.user (custom property)

  try {
    if (!user) {
      return res.status(404).send({ success: true, message: "User is undefined" });

    }
    await UserModel.findByIdAndUpdate(user._id, {
      $pull: {
        searchHistory: { id:Number(id)   }
      }
    })

    res.status(200).json({ success: true, message: "Item Removed Successfully" });
  } catch (error) {
    console.log("Error in getSearchHistory Controller")
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}


