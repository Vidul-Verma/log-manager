import {z} from 'zod';

export const logSchema = z.object({
    _id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    eventDate: z.string().min(1, "Event date is required"),
    location: z.string().min(1, "Location is required"),
});
export type Log = z.infer<typeof logSchema>;