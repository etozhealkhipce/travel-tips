import { sample } from "effector";
import { pageStarted } from "./+pageStarted";
import { postsQuery } from "./model";

// Start the query when page is loaded
sample({
  clock: pageStarted,
  target: postsQuery.start,
});
