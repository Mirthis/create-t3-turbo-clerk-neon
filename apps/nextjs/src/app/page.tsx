import { Suspense } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

import { api } from "~/trpc/server";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

// export const runtime = "edge";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>

        <SignedIn>
          <div className="flex items-center gap-4">
            <p>You are signed in</p>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <p>You are not signed in</p>
          <SignIn />
        </SignedOut>

        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList posts={posts} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
