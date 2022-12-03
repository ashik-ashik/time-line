import React, { useEffect, useState } from 'react';
import '../../../Styles/Post/Post.scss';
import { useForm } from "react-hook-form";
import useData from '../../../hooks/useData/UseData';

const Post = () => {
  const {setNewPost, user} = useData();
  const [countWords, setWords] = useState(0);
  const [countCharac, setCharac] = useState(0);
  const [countPara, setPara] = useState(0);

  const [post, setPost] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const postNow = data => {
    data.postContent = data.postContent.split('\n');
    data.postDate = new Date().toLocaleDateString();
    data.postAuthor = user?.user?.displayName;
    data.authorEmail = user?.user?.email;
    setPost(data)
  };
  
  useEffect(()=>{
      fetch(`https://time-line-server-mdashik989.vercel.app/post`, {
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(post)
    })
    .then(res => {
      if(res.status === 200){
        setNewPost(1);
        reset();
        window.location.replace('/');
      }
    });
    
  },[post, reset, setNewPost]);

  // count post content
  const contentCount = e => {
    setWords(e?.target?.value?.split(" ")?.length);
    setCharac(e?.target?.value?.split("")?.length);
    setPara(e?.target?.value?.split("\n")?.length);
  }



  // console.log(post)
  return (
    <>
      <div className="post-form" id='post-form'>
        <h3>Create a post:</h3>
        
        <form onSubmit={handleSubmit(postNow)}>
          <input {...register('postTitle')} className='post-title' type="text" name="postTitle" placeholder="Post Title &#128221;" />
          <p className="content-count">
            <span>Para: {countPara}</span>
            <span> Words: {countWords}</span>
            <span> Charac: {countCharac}</span>
          </p>
          <textarea onKeyUp={contentCount} {...register('postContent', {required: true})} className="post-content" name="postContent" cols="30" rows="10" placeholder='Write Your Story...'></textarea>
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
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;