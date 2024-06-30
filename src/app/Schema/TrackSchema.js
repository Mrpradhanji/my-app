// pages/new-track.js
"use client";
import { z } from 'zod';

export const TrackSchema = z.object({
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
