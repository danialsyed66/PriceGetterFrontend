import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Footer, Loader, MetaData, Navbar } from '../layouts';
import Comment from './Comment';
import Post from './Post';
import PostForm from './PostForm';
import { getPost } from '../../redux/actions/forumsActions';
import fire from '../../utils/swal';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, post, message } = useSelector(state => state.forums);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (message) fire(message, 'success');
  }, [message]);

  return (
    <>
      <MetaData title="Forum Discussion" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <Link to="/forums" className="btn btn-primary m-3">
            Back to Forums
          </Link>
          <h1 className="large text-primary">Post</h1>
          <Post showActions={false} post={post} />
          <PostForm forComment={true} postId={post._id} />
          {post.comments?.length > 0 && (
            <h1 className="lead text-primary m-2">Comments</h1>
          )}
          {post.comments?.map(comment => (
            <Comment key={comment._id} postId={post._id} comment={comment} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default PostPage;
