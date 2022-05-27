import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './forum.css';
import Back from './../../assets/arrow-left.svg';

import Post from './Post';
import PostForm from './PostForm';
import Comment from './Comment';
import { Footer, Loader, MetaData, Navbar } from '../layouts';
import fire from '../../utils/swal';
import { getPost } from '../../redux/actions/forumsActions';

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
          <Link to="/forums" className="btn m-3 ">
            <img src={Back} alt="" />
          </Link>

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
