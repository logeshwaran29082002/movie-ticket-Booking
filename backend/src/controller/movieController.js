const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
require("dotenv").config();


const API_BASE = process.env.API_BASE;

/* ---------------------- small helpers ---------------------- */
// Builds a full upload URL from a filename or returns null if invalid
const getUploadUrl = (val) => {
  if (!val) return null;
  return val;
};



const attachLatestTrailerFiles = (people = [], files = []) => {
  if (!Array.isArray(people)) return [];

  return people.map((p, i) => ({
    name: p?.name || "",
    role: p?.role || "",
    file: files?.[i]?.path || null,
  }));
};






// Safely parses JSON and returns null on failure
const safeParseJSON = (v) => {
  if (!v) return null;
  if (typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};



// Converts a person object into a {name, role, preview} format
const personToPreview = (p) => {
  if (!p) return { name: "", role: "", preview: null };

  return {
    name: p.name || "",
    role: p.role || "",
    preview: p.file ? getUploadUrl(p.file) : null,
  };
};


const enrichLatestTrailerForOutput = (lt = {}) => {
  const copy = { ...lt };
  copy.thumbnail = copy.thumbnail
    ? getUploadUrl(copy.thumbnail)
    : copy.thumbnail || null;
  const mapPerson = (p) => {
    const c = { ...(p || {}) };
    c.preview = c.file
      ? getUploadUrl(c.file)
      : c.preview
      ? getUploadUrl(c.preview)
      : null;
    c.name = c.name || "";
    c.role = c.role || "";
    return c;
  };
  copy.directors = (copy.directors || []).map(mapPerson);
  copy.producers = (copy.producers || []).map(mapPerson);
  copy.singers = (copy.singers || []).map(mapPerson);
  return copy;
};

const normalizeItemForOutput = (it = {}) => {
  const obj = { ...it };
 obj.thumbnail =
  it.latestTrailer?.thumbnail
    ? getUploadUrl(it.latestTrailer.thumbnail)
    : it.poster
    ? getUploadUrl(it.poster)
    : null;
obj.trailerUrl =
  it.latestTrailer?.videoUrl || it.trailerUrl || null;


  if (it.type === "latestTrailers" && it.latestTrailer) {
    const lt = it.latestTrailer;
    obj.genres = obj.genres || lt.genres || [];
    obj.year = obj.year || lt.year || null;
    obj.rating = obj.rating || lt.rating || null;
    obj.duration = obj.duration || lt.duration || null;
    obj.description = obj.description || lt.description || lt.excerpt || "";
  }

  obj.cast = (it.cast || []).map(personToPreview);
  obj.directors = (it.directors || []).map(personToPreview);
  obj.producers = (it.producers || []).map(personToPreview);

  if (it.latestTrailer)
    obj.latestTrailer = enrichLatestTrailerForOutput(it.latestTrailer);

  // NEW: include auditorium in normalized output (keep null if not present)
  obj.auditorium = it.auditorium || null;

  return obj;
};

// Create a movie
const createMovie = async (req, res) => {
  console.log("BODY =>", req.body);

  try {
    const body = req.body || {};

const posterUrl =
  req.files && req.files.poster
    ? req.files.poster[0].path
    : null;




    const trailerUrl = body.trailerUrl || null;
    const videoUrl = body.videoUrl || null;

    const categories = body.categories
  ? safeParseJSON(body.categories) ||
    String(body.categories)
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
  : [];


    const slots = safeParseJSON(body.slots) || [];

    const seatPrices = safeParseJSON(body.seatPrices) || {
      standard: Number(body.standard || 0),
      recliner: Number(body.recliner || 0),
    };

const cast =
  safeParseJSON(body.cast || "[]").map((c, i) => ({
    name: c.name || "",
    role: c.role || "",
    file: req.files?.castFiles?.[i]?.path || null,
  }));

const directors =
  safeParseJSON(body.directors || "[]").map((d, i) => ({
    name: d.name || "",
    file: req.files?.directorFiles?.[i]?.path || null,
  }));

const producers =
  safeParseJSON(body.producers || "[]").map((p, i) => ({
    name: p.name || "",
    file: req.files?.producerFiles?.[i]?.path || null,
  }));

    
/* --------------------------------------------------
   🔥 FORCE latestTrailer FOR latestTrailers TYPE
-------------------------------------------------- */
let latestTrailer = null;

if (body.type === "latestTrailers") {
  console.log("BODY:", body);
console.log("FILES:", req.files);

  latestTrailer = {};

  // thumbnail
  if (req.files?.ltThumbnail?.[0]?.path) {
    latestTrailer.thumbnail = req.files.ltThumbnail[0].path;
  }

  // ✅ VIDEO URL – MAIN FIX
 const videoUrl =
  body.ltVideoUrl ||
  body.videoUrl ||
  (body.latestTrailer &&
    JSON.parse(body.latestTrailer)?.videoId);


  if (videoUrl) {
    latestTrailer.videoUrl = videoUrl;
  }

  // title
  latestTrailer.title = body.movieName || "";

  // optional: parse extra data
  if (body.latestTrailer) {
const parsed = safeParseJSON(body.latestTrailer) || {};
console.log("PARSED LATEST TRAILER:", parsed);


    latestTrailer.genres = parsed.genres || [];
    latestTrailer.duration = parsed.duration || {};
    latestTrailer.year = parsed.year || null;
    latestTrailer.rating = parsed.rating || null;
    latestTrailer.description = parsed.description || "";
latestTrailer.directors = attachLatestTrailerFiles(
  parsed.directors,
  req.files?.ltDirectorFiles
);

latestTrailer.producers = attachLatestTrailerFiles(
  parsed.producers,
  req.files?.ltProducerFiles
);

latestTrailer.singers = attachLatestTrailerFiles(
  parsed.singers,
  req.files?.ltSingerFiles
);

  }
}


    const auditoriumValue =
      typeof body.auditorium === "string" && body.auditorium.trim()
        ? body.auditorium.trim()
        : "Audi 1";

    /* --------------------------------------------------
       SAVE MOVIE
    -------------------------------------------------- */
 if (!body.movieName || !body.categories || !body.rating || !body.duration) {
  return res.status(400).json({
    success: false,
    message: "movieName, categories, rating, duration required"
  });
}

const doc = new Movie({
  type: body.type || "normal",
  movieName: body.movieName,
  categories: categories,
  poster: posterUrl,
  trailerUrl: trailerUrl,
  videoUrl: videoUrl,
  rating: Number(body.rating),
  duration: Number(body.duration),
  slots: slots,
  seatPrices: seatPrices,
  cast: cast,
  directors: directors,
  producers: producers,
  story: body.story,
  latestTrailer: latestTrailer,
  auditorium: auditoriumValue,
});

    const saved = await doc.save();

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: saved,
    });
  } catch (err) {
    console.error("CreateMovie Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get all mcvies

const getMovies = async (req, res) => {
  try {
    const {
      categories,
      type,
      sort = "-createdAt",
      page = 1,
      limit = 520,
      search,
      latestTrailer,
    } = req.query;
    let filter = {};
    if (typeof categories  === "string" && categories.trim())
      filter.categories = { $in: [categories.trim()] };
    if (typeof type === "string" && type.trim()) filter.type = type.trim();
    if (typeof search === "string" && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { movieName: { $regex: q, $options: "i" } },
        { "latestTrailer.title": { $regex: q, $options: "i" } },
        { story: { $regex: q, $options: "i" } },
      ];
    }
      if(latestTrailer && String(latestTrailer).toLowerCase() !== 'false'){
        filter = Object.keys(filter).length ===0 ? {
            type:'latestTrailers'
        } :{
            $and:[filter,{ type:'latestTrailers'}]
        }
      }

       const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(200, parseInt(limit, 10) || 12);
    const skip = (pg - 1) * lim;

    const total = await Movie.countDocuments(filter);
    const items = await Movie.find(filter).sort(sort).skip(skip).limit(lim).lean();

    const normalized = (items || []).map(normalizeItemForOutput);
    return res.json({
        sucess:true,
        total,
        page:pg,
        limit: lim,
        items: normalized
    });
  } catch (err) {
         console.error('GetMovies Error:' , err);
         return res.status(500).json({
            success:false,
            message: " Server Error"
         })
  }
};

// Get a movie using id
const getMovieById = async (req,res) =>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({
                sucess:false,
                message: 'ID is required.'
            })      
          }

          const item = await Movie.findById(id).lean();
          if(!item) return res.status(404).json({
            success:false,
            message:"Movie not found"
          });

    const object = normalizeItemForOutput(item);

if (item.type === "latestTrailers" && item.latestTrailer) {
  const lt = item.latestTrailer;
  object.genres = object.genres || lt.genres || [];
  object.year = object.year || lt.year || null;
  object.rating = object.rating || lt.rating || null;
  object.duration = object.duration || lt.duration || null;
  object.description =
    object.description || lt.description || lt.excerpt || "";
}

    return res.json({sucess:true, item:object});
    } 
    catch (err) {
   
  console.error('GetMoviesById Error:' , err);
         return res.status(500).json({
            success:false,
            message: " Server Error"
         })
        
   }
}

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    const m = await Movie.findById(id);
    if (!m) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (err) {
    console.error("DeleteMovie Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { createMovie,getMovies,getMovieById,deleteMovie};
