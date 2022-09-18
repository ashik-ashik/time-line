import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../Styles/Post/Post.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';

const EditPost = () => {
  const {postId} = useParams();
  // const [currentPost, setCurrentPost] = useState(null);
  const {data} = useData();
  const currentPost = data?.filter(post => post?._id === postId);
  // console.log(currentPost[0]);

  const { register, handleSubmit, reset } = useForm();

  const updateNow = data => {
    data.postContent = data.postContent.split('\n');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    fetch(`https://radiant-refuge-40674.herokuapp.com/edit/${postId}`, requestOptions)
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

  const contentWrite = event => {
    if(event.keyCode === 13){
      event.target.value = event.target.value + '\n';
    }
    // console.log(event.target.value);
  }

  console.log(postId);

  if(!data){
    return <div className="container"><h4>Loading....</h4></div>
  }
  return (
    <article>
      <section className="container">
       <div className="post-form" id='post-form'>
        <h3>Edit post:</h3>
        <form onSubmit={handleSubmit(updateNow)}>
          <input {...register('postTitle')} defaultValue={currentPost[0]?.postTitle} className='post-title' type="text" name="postTitle" placeholder="Post Title &#128221;" />
          <textarea onKeyUp={contentWrite} {...register('postContent', {required: true})} defaultValue={currentPost[0]?.postContent} className="post-content" name="postContent" cols="30" rows="10" placeholder='Write Your Story...'></textarea>
          <div className="form-grid">
            <select name="postType" {...register("postType")}>
              <option selected={currentPost[0]?.postType === 'Timeline' && true}  value="Timeline">&#128221; Time Line</option>
              <option selected={currentPost[0]?.postType === 'Dairy' && true}  value="Dairy">&#128215; Dairy</option>
            </select>
            <input type="text" {...register("postTag")} defaultValue={currentPost[0]?.postTag} name="postTag" placeholder="Tags..." />
          </div>
          <div className="privacy-feeling">
            <div className="privacy">
              <h5>Post Privacy:</h5> 
              <select name="postPrivacy" {...register("postPrivacy")}>
                <option selected={currentPost[0]?.postPrivacy === '127758' && true} value="127758">&#127758; Public</option>
                <option selected={currentPost[0]?.postPrivacy === '128274' && true} value="128274">&#128274; Private</option>
              </select>
            </div>
            <div className="feeling">
              <h5>Feelings:</h5>
              <select name="postFeeling" {...register("postFeeling")}>
                <option selected={currentPost[0]?.postFeeling === '128522' && true} value="128522">&#128522; Happy</option>
                <option selected={currentPost[0]?.postFeeling === '128546' && true} value="128546">&#128546; Sad</option>
                <option selected={currentPost[0]?.postFeeling === '128545' && true} value="128545">&#128545; Angry</option>
                <option selected={currentPost[0]?.postFeeling === '128562' && true} value="128562">&#128562; Surprised</option>
                <option selected={currentPost[0]?.postFeeling === '128515' && true} value="128515">&#128515; Excited</option>
                <option selected={currentPost[0]?.postFeeling === '128532' && true} value="128532">&#128532; Tired</option>
                <option selected={currentPost[0]?.postFeeling === '128536' && true} value="128536">&#128536; Lovely</option>
                <option selected={currentPost[0]?.postFeeling === '128533' && true} value="128533">&#128533; Lonely</option>
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