/// <reference types="vite-plugin-svgr/client" />
import React from 'react'
import { Link } from "react-router-dom";
import VoteArrow from "../assets/arrow.svg?react";
import moment from 'moment';

type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
type Comment = {content: string, memberId: number};

export type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: any;
  comments: Comment[];
  votes: Vote[]
};

function computeVoteCount(votes: Vote[]) {
  let count = 0;
  votes.forEach((v) => v.voteType === 'Upvote' ? count++ : count--);
  return count;
}

export const PostsList = ({ posts }: { posts: Post[] }) => (
  <div className="posts-list">
    {posts.map((post, key) => (
      <div className="post-item" key={key}>
        <div className="post-item-votes">
          <div className="post-item-upvote">
            <VoteArrow className="vote-arrow vote-arrow__up" />
          </div>
          <div className="vote-count">{computeVoteCount(post.votes)}</div>
          <div className="post-item-downvote">
            <VoteArrow className="vote-arrow vote-arrow__down" />
          </div>
        </div>
        <div className="post-item-content">
          <div className="post-item-title">{post.title}</div>
          <div className="post-item-details">
            <div>{moment(post.dateCreated).fromNow()}</div> <span className="seperator">|</span>
            <Link to={`/member/${post.memberPostedBy.user.username}`}>
              by {post.memberPostedBy.user.username}
            </Link> <span className="seperator">|</span>
            <div>
              {post.comments.length}{" "}
              {post.comments.length !== 1 ? `comments` : "comment"}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
