import React from 'react';
import '../../../Styles/Post/Post.scss';
import { useForm } from "react-hook-form";

const Post = () => {
  const { register, handleSubmit } = useForm();
  const postNow = data => {
    data.postDate = new Date().toLocaleDateString();
    console.log(data)
  };
  return (
    <>
      <div className="post-form" id='post-form'>
        <h3>Create a post:</h3>
        <form onSubmit={handleSubmit(postNow)}>
          <input {...register('postTitle')} className='post-title' type="text" name="postTitle" placeholder="Post Title &#128221;" />
          <textarea {...register('postContent', {required: true})} className="post-content" name="postContent" cols="30" rows="10" placeholder='Write Your Story...'></textarea>
          <div className="form-grid">
            <select name="postType" {...register("postType")}>
              <option value="timeline">&#128221; Time Line</option>
              <option value="Dairy">&#128215; Dairy</option>
            </select>
            <input type="text" name="postTag" placeholder="Tags..." />
          </div>
          <div className="privacy">
            <h5>Post Privacy:</h5>
            <select name="postPrivacy" {...register("postPrivacy")}>
              <option value="public">&#127758; Public</option>
              <option value="private">&#128274; Private</option>
            </select>
          </div>
          <div className="post-btn">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;