const { z } = require("zod");

const logSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID format" }),
  username: z.string().min(2, "Username is too short"),
  location: z.string().min(2, "Event description is too short"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  physicalLocation: z.string().min(2, "Physical location is too short"),
});

module.exports = { logSchema };