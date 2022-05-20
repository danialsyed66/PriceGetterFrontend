import React, { useState } from 'react';
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
      <div className="post-form-header bg-primary">
        <h3>{forComment ? 'Leave a comment...' : 'Say Something...'}</h3>
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
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

PostForm.defaultProps = {
  forComment: false,
};

export default PostForm;
