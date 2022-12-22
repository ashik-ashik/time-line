import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../Styles/Post/Post.scss';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';

const EditPost = () => {
  const {postId} = useParams();
  // const [currentPost, setCurrentPost] = useState(null);
  const {data} = useData();
  const currentPost = data?.filter(post => post?._id === postId);
  console.log(currentPost);

  const { register, handleSubmit, reset, setValue } = useForm();
  setValue('postTitle',currentPost[0]?.postTitle);
  setValue('postContent',currentPost[0]?.postContent?.join('\n'));
  setValue('postType',currentPost[0]?.postType);
  setValue('postPrivacy',currentPost[0]?.postPrivacy);
  setValue('postTag',currentPost[0]?.postTag);
  setValue('postFeeling',currentPost[0]?.postFeeling);

  const updateNow = data => {
    data.postContent = data.postContent.split('\n');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    fetch(`https://time-line-server.vercel.app/edit/${postId}`, requestOptions)
    .then(res => res.json())
    .then(result => {
      if(result.modifiedCount){
        reset();
        window.alert("The post has been updated successfully");
        window.location.replace("/");
      }
      // console.log(result.modifiedCount);
    })
    // console.log(data);
  }


  if(!data){
    return <div className="container"><h4>Loading....</h4></div>
  }
  return (
    <article>
      <section className="container">
       <div className="post-form" id='post-form'>
        <h3>Edit post:</h3>
        <form onSubmit={handleSubmit(updateNow)}>
          <input {...register('postTitle')} className='post-title' type="text" name="postTitle" placeholder="Post Title &#128221;" />
          <div id="post-content">
          <textarea  {...register('postContent', {required: true})} className="post-content" name="postContent" cols="30" rows="10" placeholder='Write Your Story...'></textarea>

          </div>
          <div className="form-grid">
            <select name="postType" {...register("postType")}>
              <option value="Timeline">&#128221; Time Line</option>
              <option value="Dairy">&#128215; Dairy</option>
            </select>
            <input type="text" {...register("postTag")} name="postTag" placeholder="Tags..." />
          </div>
          <div className="privacy-feeling">
            <div className="privacy">
              <h5>Post Privacy:</h5> 
              <select name="postPrivacy" {...register("postPrivacy")}>
                <option value="127758">&#127758; Public</option>
                <option value="128101">&#128101; Member</option>
                <option value="128274">&#128274; Private</option>
              </select>
            </div>
            <div className="feeling">
              <h5>Feelings:</h5>
              <select name="postFeeling" {...register("postFeeling")}>
                <option value="128522">&#128522; Happy</option>
                <option value="128546">&#128546; Sad</option>
                <option value="128545">&#128545; Angry</option>
                <option value="128562">&#128562; Surprised</option>
                <option value="128515">&#128515; Excited</option>
                <option value="128532">&#128532; Tired</option>
                <option value="128536">&#128536; Lovely</option>
                <option value="128533">&#128533; Lonely</option>
              </select>
            </div>
          </div>
          <div className="post-btn">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      </section>
    </article>
  );
};

export default EditPost;