import { useUnit } from "effector-react";

import "./init";
import type { Post } from "~/shared/api/posts/effects";
import { postsQuery } from "./model";
import { LocaleLink } from "@/shared/ui/atoms/locale-link";

function PostsList() {
  const posts = useUnit(postsQuery.$data);
  const error = useUnit(postsQuery.$error);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Posts</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No posts found
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.slice(0, 10).map((post: Post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {post.id}. {post.title}
          </h3>
          <p className="text-gray-600 text-sm">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-gray-100 border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
        </div>
      ))}
    </div>
  );
}


export default function ExamplePage() {
  const pending = useUnit(postsQuery.$pending);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Example Page with API
        </h1>
        <p className="text-gray-600">
          This page demonstrates SSR with farfetched, loading fallback UI, and JSONPlaceholder API
        </p>
        <LocaleLink href="/" className="text-blue-500 hover:underline mt-2 inline-block">
          ← Back to Home
        </LocaleLink>
      </div>

      {pending ? <LoadingFallback /> : <PostsList />}
    </div>
  );
}
