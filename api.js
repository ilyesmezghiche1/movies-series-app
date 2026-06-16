const API_KEY = "a44a18c6935a5b20424a8d996ebcb3b1";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const POSTER_IMG_URL = "https://image.tmdb.org/t/p/w342";
const PROFILE_IMG_URL = "https://image.tmdb.org/t/p/w185";

async function getTrending() {
  try {
    let result = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
    if (!result.ok) throw new Error("Failed");
    let data = await result.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getNowPlayingMovies() {
  try {
    let result = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    if (!result.ok) throw new Error("Failed");
    let data = await result.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getOnAirSeries() {
  try {
    let result = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
    if (!result.ok) throw new Error("Failed");
    let data = await result.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getMovieMoreDetails(id){
  try{
    let result = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`)
    if (!result.ok) throw new Error("Failed");
    let data = await result.json();
    return data;
  }catch(error){
    console.error(error);
    return null;
  }
}

async function getTvMoreDetails(id){
  try{
    let result = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`)
    if (!result.ok) throw new Error("Failed");
    let data = await result.json();
    return data;
  }catch(error){
    console.error(error);
    return null;
  }
}
