import { z } from "zod";
import { logSchema } from "./Log";

export const paginatedLogsSchema = z.object({
    currentPage: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    logs: z.array(logSchema),
  });
  
  export type PaginatedLogs = z.infer<typeof paginatedLogsSchema>;