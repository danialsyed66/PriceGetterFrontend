import React, { useState } from 'react';

import './forum.css';
import { useDispatch } from 'react-redux';
import { addComment, addPost } from '../../redux/actions/forumsActions';

const PostForm = ({ forComment, postId }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (forComment) dispatch(addComment(postId, { text }));
    else dispatch(addPost({ text }));

    setText('');
  };

  return (
    <div className="post-form">
      <div className="post-form-header ">
        <h3>
          {forComment
            ? 'Leave a comment...'
            : 'Ask About Products in Community'}
        </h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          cols="30"
          rows="5"
          placeholder={forComment ? 'Write some comment' : 'Create a post'}
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <div className="post_forum">
          {forComment ? '' : <></>}
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </div>
      </form>
    </div>
  );
};

PostForm.defaultProps = {
  forComment: false,
};

export default PostForm;
