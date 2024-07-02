"use client";
import React, { useState } from 'react';
import { albumSchema } from '../Schema/albumSchema';

const AlbumForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    artist: '',
    genre: '',
    label: '',
    language: '',
    producer: '',
    duration: '',
    artwork: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, artwork: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      albumSchema.parse(formData);
      console.log('Form data is valid:', formData);
      // Submit form data
    } catch (error) {
      setErrors(error.formErrors.fieldErrors);
    }
  };

  return (
    <div className="w-full h-screen mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Album Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Song Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Title of Album or Song"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Main Artist</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Name of Artist"
            />
            {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Genre</option>
              {/* Add more genre options here */}
            </select>
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Record Label</label>
            <select
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Your Label</option>
              {/* Add more record label options here */}
            </select>
            {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Song Language</option>
              {/* Add more language options here */}
            </select>
            {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Producer</label>
            <input
              type="text"
              name="producer"
              value={formData.producer}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Producer Name"
            />
            {errors.producer && <p className="text-red-500 text-sm mt-1">{errors.producer[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="time"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration[0]}</p>}
          </div>
          <div className="flex flex-col col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Art Work (File Type: png, jpg | File Size: 300 x 300)
            </label>
            <div className="max-w-fit mt-1 flex items-center justify-between border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <input
                type="file"
                name="artwork"
                onChange={handleFileChange}
                className="w-max text-sm text-gray-500"
              />
            </div>
            {errors.artwork && (
              <p className="text-red-500 text-sm mt-1">{errors.artwork[0]}</p>
            )}
          </div>
          <div className="col-span-2 mb-2 text-center">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AlbumForm;
