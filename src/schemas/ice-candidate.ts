import { z } from "zod";

/** ICE Candidateのzodスキーマ */
export const IceCandidateSchema = z.object({
  candidate: z.string(),
  sdpMid: z.string().optional(),
  sdpMLineIndex: z.number().optional(),
});
