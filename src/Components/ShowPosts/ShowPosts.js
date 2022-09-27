import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import  '../../Styles/PostDesign/PostDesign.scss';

const ShowPosts = ({data}) => {

  const {user} = useData();
  const userPhoto = user?.user?.photoURL;
  const deletePost = id => {
    const confirmDelete = window.confirm("Are you Sure??");
    if(confirmDelete){
      fetch(`https://radiant-refuge-40674.herokuapp.com/delete/${id}`,{
        method: "DELETE"
      })
      .then(res => res.json())
      .then(result => {
        if(result.deletedCount){
          window.location.reload()
        }
        console.log(result);
      })
    }
  }

  if(!data){
    return <div className="container">
      <h3>Loading...</h3>
    </div>
  }

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
                    <h2><Link to={`/timeline/${post?._id}`} >{post?.postTitle}</Link> </h2>
                    <small> Feelings with &mdash;{String.fromCodePoint(post?.postFeeling)}</small>
                    {
                      user?.user?.email === post?.authorEmail && <div className="action-option" >
                      <div className='option'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="option-container">
                          <h3>Options</h3>
                          <ul>
                            <li><Link to={`/edit/${post?._id}`}>Edit</Link></li>
                            <li onClick={()=>deletePost(post?._id)}>Delete</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    }
                  </div>
                  <div className='date-privacy'>
                    <span>{post?.postDate}</span>
                    <span>{String.fromCodePoint(post?.postPrivacy)}</span>
                    <span style={{marginRight:'8px', display:"inline-block"}}>{post?.postType === "Dairy" ? <>&#128215;</> : <>&#128221;</>}</span>
                    </div>
                  
                  <div className="post-content">
                    {
                      post?.postContent?.map((line, i) => line !== '' && <p key={i}>{line}</p> )
                    }
                    {
                      post?.postImg && <img src={post?.postImg} alt="postImage" />
                    }
                    
                  </div>
                  <div className='tags'>{post?.postTag && <Link to={`/tags/${post?.postTag}`}>{post?.postTag}</Link>}</div>
                  <div className="admin">
                    <span>Posted By: <a href={`mailto:${post?.authorEmail}`}>{post?.postAuthor}</a></span>
                  </div>
                </div>
                
              </div>
            </div>)
          }
    </>
  );
};

export default ShowPosts;