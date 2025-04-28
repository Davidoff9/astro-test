import { defineDb, defineTable, column } from "astro:db";

const Comment = defineTable({
  columns: {
    name: column.text(),
    email: column.text(),
    message: column.text(),
  },
});

export default defineDb({
  tables: { Comment },
});
