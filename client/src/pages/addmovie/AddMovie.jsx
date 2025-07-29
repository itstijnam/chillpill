import React, { useRef, useState } from 'react';
import './style/AddMovie.scss';
import { baseUrl } from '../../utils/baseUrl';
import axios from 'axios';

function AddMovie() {
  const imageInputRef = useRef();
  const movieInputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [movieUploadCondition, setMovieUploadCondition] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [genreInput, setGenreInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    movieName: '',
    imdb: '',
    language: '',
    downloadLink: '',
    about: ''
  });

  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const toggleMovieUpload = () => {
    setMovieUploadCondition(prev => !prev);
  };

  const addMovieHandler = async (e) => {
    e.preventDefault();
    setMessage(null);

    const imageFile = imageInputRef.current.files[0];
    const videoFile = movieUploadCondition ? movieInputRef.current.files[0] : null;

    if (!imageFile) {
      return setMessage("Movie poster is required");
    }

    const uploadData = new FormData();
    uploadData.append("film_name", formData.movieName);
    uploadData.append("imdb_rating", formData.imdb);
    uploadData.append("filam_description", formData.about);
    uploadData.append("downloadable_link", formData.downloadLink);
    uploadData.append("isMoviePlayAble", movieUploadCondition);
    uploadData.append("filam_pics", imageFile);

    languages.forEach(lang => uploadData.append("filam_language", lang));
    genres.forEach(gen => uploadData.append("filam_genre", gen));

    if (movieUploadCondition && videoFile) {
      uploadData.append("filam_video", videoFile);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/movie/add`, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (res.data.success) {
        setMessage("Movie uploaded successfully");
        setFormData({
          movieName: '', imdb: '', language: '', downloadLink: '', about: ''
        });
        console.log(res.data.movie)
        setLanguages([]);
        setGenres([]);
        setPreviewImage(null);
        imageInputRef.current.value = null;
        if (movieInputRef.current) movieInputRef.current.value = null;
        setMovieUploadCondition(false);
      } else {
        setMessage(res.data.message || "Something went wrong");
        setUploadProgress(0);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className='addmovie_page'>
      <div className="addmovie_container">
        <div className="addmovie_heading">
          <h1>Add Movie +</h1>
          <span>take rest</span>
        </div>

        <form className="addmovie_form" onSubmit={addMovieHandler}>
          <div className="amf_left">
            <div className="imageupload">
              <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageChange} hidden />
              {previewImage && <img src={previewImage} className='preview_image' alt="Preview" />}
              <button type="button" onClick={() => imageInputRef.current.click()}>
                Upload Image
              </button>
            </div>

            <div className="about_movie">
              <textarea
                name="about"
                value={formData.about}
                placeholder="About Movie"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="uploadmovie_check">
              <span>I want to upload movie</span>
              <input
                type="checkbox"
                checked={movieUploadCondition}
                onChange={toggleMovieUpload}
              />
            </div>

            {movieUploadCondition && (
              <>
                <div className='form_field'>
                  <span>Upload Movie File</span>
                  <input type="file" accept="video/*" ref={movieInputRef} />
                </div>
                <span>{uploadProgress}%</span>
              </>
            )}
          </div>


          <div className="amf_right">
            <div className="form_field">
              <span>Movie Name</span>
              <input type="text" name="movieName" value={formData.movieName} onChange={handleChange} />
            </div>

            <div className="form_field">
              <span>IMDb Rating</span>
              <input type="text" name="imdb" value={formData.imdb} onChange={handleChange} />
            </div>

            <div className="form_field">
              <span>Language</span>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const lang = formData.language.trim();
                    if (lang && !languages.includes(lang)) {
                      setLanguages(prev => [...prev, lang]);
                      setFormData(prev => ({ ...prev, language: '' }));
                    }
                  }
                }}
                placeholder="Type and press Enter"
              />
              <div className="language_tags">
                {languages.map((l, i) => (
                  <div className="language_tag" key={i}>
                    {l}
                    <span className="remove_tag" onClick={() => {
                      setLanguages(prev => prev.filter((_, index) => index !== i));
                    }}>
                      &times;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form_field">
              <span>Genre</span>
              <input
                type="text"
                name="genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const g = genreInput.trim();
                    if (g && !genres.includes(g)) {
                      setGenres(prev => [...prev, g]);
                      setGenreInput('');
                    }
                  }
                }}
                placeholder="Type and press Enter"
              />
              <div className="language_tags">
                {genres.map((g, i) => (
                  <div className="language_tag" key={i}>
                    {g}
                    <span className="remove_tag" onClick={() => {
                      setGenres(prev => prev.filter((_, index) => index !== i));
                    }}>
                      &times;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form_field">
              <span>Download Link</span>
              <input
                type="text"
                name="downloadLink"
                value={formData.downloadLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="add_action_btn">
            <button type='submit' disabled={loading}>{loading ? 'Uploading...' : '+'}</button>
          </div>

          {message && <div className="form_message">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
