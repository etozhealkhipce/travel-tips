
import { postsQuery } from "@/shared/api/posts";

export { postsQuery } from "@/shared/api/posts";


// Start query when page is loaded
postsQuery.start.watch(() => {
  console.log("Starting posts query...");
});
