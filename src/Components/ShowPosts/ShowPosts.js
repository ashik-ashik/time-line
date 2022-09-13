import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import  '../../Styles/PostDesign/PostDesign.scss';

const ShowPosts = ({data}) => {

  const {user} = useData();
  const userPhoto = user?.user?.photoURL;
  console.log(user?.user?.displayName);

  return (
    <>
      {
            data?.map(post => <div key={post?._id} className="post" >
              <hr />
              <div className="post-grid">
                <div className="user-photo">
                  <img src="https://i.postimg.cc/4ND07BXk/mtl.png" alt="" />
                  {/* <img src={userPhoto} alt="" /> */}
                </div>

                <div className="post-details">
                  <div className="post-header">
                    <h2>{post?.postTitle} </h2>
                    <small> Feelings with &mdash;{String.fromCodePoint(post?.postFeeling)}</small>
                  </div>
                  <p className='date-privacy'>
                    <span>{post?.postDate} &nbsp;</span>
                    <span>{String.fromCodePoint(post?.postPrivacy)} &nbsp;</span>
                    <span style={{marginRight:'8px', display:"inline-block"}}>{post?.postType === "Dairy" ? <>&#128215;</> : <>&#128221;</>}</span>
                    </p>
                  
                  <div className="post-content">
                    <p >
                      {post?.postContent}
                    </p>
                    {
                      post?.postImg && <img src={post?.postImg} alt="postImage" />
                    }
                    
                  </div>
                  <div className='tags'><Link to={``}>{post?.postTag}</Link></div>
                </div>
                
              </div>
            </div>)
          }
    </>
  );
};

export default ShowPosts;