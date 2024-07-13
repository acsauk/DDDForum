import React from "react";
import { Link } from "react-router-dom";

export const PostsViewSwitcher = () => (
    <div className="post-switcher">
        <Link to="#">Popular</Link> <span className="seperator">|</span> <Link to="#">New</Link>
    </div>
);