import React, { useEffect, useState } from "react"
import { Layout } from "../components/layout";
import { PostsList, Post } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
// import { api } from "../api";

export const MainPage = () => {
    const posts: Post[] = [
        {
          title: 'Domain services vs Application services',
          dateCreated: '2024-07-06',
          memberPostedBy: { user: {username: 'John Doe'} },
          comments: [
            { content: 'This is a great post!', memberId: 1 },
            { content: 'I agree!', memberId: 2 },
          ],
          votes: [
            { id: 1, postId: 1, voteType: 'Upvote' },
            { id: 2, postId: 1, voteType: 'Upvote' },
            { id: 3, postId: 1, voteType: 'Downvote' },
          ],
        },
        {
          title: 'Ports and adapters',
          dateCreated: '2024-07-05',
          memberPostedBy: { user: {username: 'Jane Doe'} },
          comments: [
            { content: 'Interesting perspective!', memberId: 1 },
          ],
          votes: [
            { id: 4, postId: 2, voteType: 'Upvote' },
            { id: 5, postId: 2, voteType: 'Downvote' },
            { id: 6, postId: 2, voteType: 'Downvote' },
          ],
        },
        {
          title: 'An Introduction to Domain-Driven Design - DDD w/ TypeScript',
          dateCreated: '2024-07-05',
          memberPostedBy: { user: {username: 'Jane Doe'} },
          comments: [
            { content: 'Super cooooool', memberId: 1 },
          ],
          votes: [
            { id: 4, postId: 2, voteType: 'Upvote' },
            { id: 5, postId: 2, voteType: 'Downvote' },
            { id: 6, postId: 2, voteType: 'Downvote' },
          ],
        },
      ];

    return (
        <Layout>
            <PostsViewSwitcher />
            <PostsList
              posts={posts}
            />
        </Layout>
    )
}