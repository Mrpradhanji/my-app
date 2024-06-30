// pages/new-track.js
"use client";
import { useState } from 'react';
import { z } from 'zod';

const TrackSchema = z.object({
  title: z.string().min(1, "Track title is required"),
  category: z.string().min(1, "Track category is required"),
  audioFile: z.any().refine((file) => file.size <= 134217728, "File size should be less than 128MB"),
  callerTuneTime: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/, "Invalid time format"),
  trackType: z.string().min(1, "Track type is required"),
  version: z.string().min(1, "Version is required"),
  primaryArtists: z.array(z.string().min(1, "Artist name is required")),
  producers: z.array(z.string().min(1, "Producer name is required")),
  lyricists: z.array(z.object({
    name: z.string().min(1, "Lyricist name is required"),
    ipi: z.string().optional(),
    iprs: z.enum(['Yes', 'No']),
    role: z.string().min(1, "Role is required"),
  })),
  composers: z.array(z.object({
    name: z.string().min(1, "Composer name is required"),
    ipi: z.string().optional(),
    iprs: z.enum(['Yes', 'No']),
    role: z.string().min(1, "Role is required"),
  })),
});

export default function NewTrack() {
  const [primaryArtists, setPrimaryArtists] = useState(['']);
  const [producers, setProducers] = useState(['']);
  const [lyricists, setLyricists] = useState([{ name: '', ipi: '', iprs: 'Yes', role: '' }]);
  const [composers, setComposers] = useState([{ name: '', ipi: '', iprs: 'Yes', role: '' }]);
  const [errors, setErrors] = useState({});

  const handleAddArtist = (setter) => {
    setter((prev) => [...prev, '']);
  };

  const handleAddPerson = (setter) => {
    setter((prev) => [...prev, { name: '', ipi: '', iprs: 'Yes', role: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      audioFile: formData.get('audioFile'),
      callerTuneTime: formData.get('callerTuneTime'),
      trackType: formData.get('trackType'),
      version: formData.get('version'),
      primaryArtists,
      producers,
      lyricists,
      composers,
    };

    const result = TrackSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.format());
    } else {
      setErrors({});
      // handle successful form submission
      console.log(data);
    }
  };

  return (
   
    <div className="w-100vw h-100vw  p-6  bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Track Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Track Title</label>
            <input
              name="title"
              type="text"
              placeholder="Song Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title._errors[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Track Category</label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Song Category</option>
              {/* Add your categories here */}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category._errors[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Audio File (Max 128M)</label>
            <input
              name="audioFile"
              type="file"
              className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.audioFile && <p className="text-red-500 text-sm mt-1">{errors.audioFile._errors[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Caller Tune Time (HH:MM:SS)</label>
            <input
              name="callerTuneTime"
              type="text"
              placeholder="00:00:00"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.callerTuneTime && <p className="text-red-500 text-sm mt-1">{errors.callerTuneTime._errors[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Track Type</label>
            <select
              name="trackType"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Track Type</option>
              {/* Add Track Types As your need Sir and Same for every comments i marked for you*/}
            </select>
            {errors.trackType && <p className="text-red-500 text-sm mt-1">{errors.trackType._errors[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Version</label>
            <select
              name="version"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Remix">Remix</option>
              {/* Add more versions here */}
            </select>
            {errors.version && <p className="text-red-500 text-sm mt-1">{errors.version._errors[0]}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Track Artist(s) - Primary</label>
          {primaryArtists.map((artist, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                placeholder="Singer Name"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={artist}
                onChange={(e) => {
                  const newArtists = [...primaryArtists];
                  newArtists[index] = e.target.value;
                  setPrimaryArtists(newArtists);
                }}
              />
              <button
                type="button"
                onClick={() => handleAddArtist(setPrimaryArtists)}
                className="ml-3 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                +
              </button>
              {errors.primaryArtists && errors.primaryArtists[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.primaryArtists[index]._errors[0]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Track Artist(s) - Producer</label>
          {producers.map((producer, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                placeholder="Music Producer"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={producer}
                onChange={(e) => {
                  const newProducers = [...producers];
                  newProducers[index] = e.target.value;
                  setProducers(newProducers);
                }}
              />
              <button
                type="button"
                onClick={() => handleAddArtist(setProducers)}
                className="ml-3 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                +
              </button>
              {errors.producers && errors.producers[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.producers[index]._errors[0]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Lyricist(s)</label>
          {lyricists.map((lyricist, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Lyricist Name"
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lyricist.name}
                onChange={(e) => {
                  const newLyricists = [...lyricists];
                  newLyricists[index].name = e.target.value;
                  setLyricists(newLyricists);
                }}
              />
              <input
                type="text"
                placeholder="IPI Number (optional)"
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lyricist.ipi}
                onChange={(e) => {
                  const newLyricists = [...lyricists];
                  newLyricists[index].ipi = e.target.value;
                  setLyricists(newLyricists);
                }}
              />
              <div className="flex items-center mb-2">
                <span className="mr-2">IPRS Member?</span>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lyricist.iprs}
                  onChange={(e) => {
                    const newLyricists = [...lyricists];
                    newLyricists[index].iprs = e.target.value;
                    setLyricists(newLyricists);
                  }}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Role"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lyricist.role}
                onChange={(e) => {
                  const newLyricists = [...lyricists];
                  newLyricists[index].role = e.target.value;
                  setLyricists(newLyricists);
                }}
              />
              <button
                type="button"
                onClick={() => handleAddPerson(setLyricists)}
                className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Lyricist
              </button>
              {errors.lyricists && errors.lyricists[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.lyricists[index].name?._errors[0]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Composer(s)</label>
          {composers.map((composer, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Composer Name"
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={composer.name}
                onChange={(e) => {
                  const newComposers = [...composers];
                  newComposers[index].name = e.target.value;
                  setComposers(newComposers);
                }}
              />
              <input
                type="text"
                placeholder="IPI Number (optional)"
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={composer.ipi}
                onChange={(e) => {
                  const newComposers = [...composers];
                  newComposers[index].ipi = e.target.value;
                  setComposers(newComposers);
                }}
              />
              <div className="flex items-center mb-2">
                <span className="mr-2">IPRS Member?</span>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={composer.iprs}
                  onChange={(e) => {
                    const newComposers = [...composers];
                    newComposers[index].iprs = e.target.value;
                    setComposers(newComposers);
                  }}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Role"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={composer.role}
                onChange={(e) => {
                  const newComposers = [...composers];
                  newComposers[index].role = e.target.value;
                  setComposers(newComposers);
                }}
              />
              <button
                type="button"
                onClick={() => handleAddPerson(setComposers)}
                className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Composer
              </button>
              {errors.composers && errors.composers[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.composers[index].name?._errors[0]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

