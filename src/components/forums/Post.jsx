import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './forum.css';

import Like from '../../utils/Like';
import {
  handleLike as handleLikeAction,
  deletePost,
} from '../../redux/actions/forumsActions';
import printDate from '../../utils/printDate';

const Post = ({
  post: { _id, text, name, avatar, user, likes, comments, createdAt },
  showActions,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!likes) return;

    if (!auth.isAuth) return;

    const liked = likes.filter(like => like.user === auth?.user?._id);

    setIsLiked(liked.length > 0 ? true : false);
  }, [setIsLiked, likes, auth]);

  const handleLike = (e, id) => {
    if (!auth.isAuth) return navigate('/login');

    setIsLiked(!isLiked);

    dispatch(handleLikeAction(id));
  };

  return (
    <div
      className="post rounded-4 my-1 p-1 btn_forum mb-4"
      style={{ minHeight: '30vh' }}
    >
      <div>
        <img
          className="rounded-circle m-3"
          src={avatar}
          alt={`${name}'s Avatar`}
          style={{ width: '60px' }}
        />
        <h5>{name}</h5>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">{printDate(createdAt)}</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Checkbox
            icon={<Like color="grey" likes={likes?.length} />}
            checkedIcon={<Like color="red" likes={likes?.length} />}
            onClick={e => handleLike(e, _id)}
            checked={isLiked}
            style={{ border: 'none' }}
          />
          {showActions && (
            <>
              <div className="d-flex ml-5 ">
                <Link to={`/forums/post/${_id}`} className="btn ">
                  Proceed To Discussion
                  {comments?.length > 0 && (
                    <p
                      className="comment-count "
                      style={{ margin: '0 0 0 0' }}
                    >{`${comments?.length} Comments`}</p>
                  )}
                </Link>
                {auth.isAuth && auth.user._id === user && (
                  <i
                    id="delete_cart_item"
                    className="fa fa-trash m-3"
                    style={{ color: 'red' }}
                    onClick={() => dispatch(deletePost(_id))}
                  ></i>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Post.defaultProps = { showActions: true };

export default Post;
