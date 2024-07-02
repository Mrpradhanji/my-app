"use client";
import { z } from 'zod';

export const albumSchema = z.object({
  title: z.string().nonempty("Title is required"),
  releaseDate: z.string().nonempty("Release date is required"),
  artist: z.string().nonempty("Artist name is required"),
  genre: z.string().nonempty("Genre is required"),
  label: z.string().nonempty("Record label is required"),
  language: z.string().nonempty("Language is required"),
  //googleDriveLink: z.string().url("Must be a valid URL"),
  producer: z.string().nonempty("Producer name is required"),
  duration: z.string().nonempty("Duration is required"),
  artwork: z.any(),
});
