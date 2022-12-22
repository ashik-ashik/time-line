import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import  '../../Styles/PostDesign/PostDesign.scss';

const ShowPosts = ({data, maxCon}) => {

  const {user, member} = useData();
  const userPhoto = user?.user?.photoURL;

  const deletePost = id => {
    const confirmDelete = window.confirm("Are you Sure??");
    if(confirmDelete){
      fetch(`https://time-line-server.vercel.app/delete/${id}`,{
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
            data?.map((post, i) => <div key={i} className="post" >
              {i !== 0 && <hr />}
              <div className="post-grid" style={{marginTop:i===0 ? '20px' : '0'}}>
                <div className="user-photo">
                  <Link to='/about'>
                    <img src="https://i.postimg.cc/4ND07BXk/mtl.png" alt="" />
                  </Link>
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
                      post?.postContent?.map((line, i) => {
                        if(maxCon && i <= 2){
                          return (<>
                          {line !== '' && <p key={i}>{line} <sub>{i +1}</sub></p>} {i===2 && <p className='read-more'><Link to={`/timeline/${post?._id}`} >Read More</Link></p>}
                          </>)
                        }else if(!maxCon){
                          return line !== '' && <p key={i}>{line} <sub>{i +1}</sub></p>
                        }
                         
                    })
                    }
                    {
                      post?.postImg && <img src={post?.postImg} alt="postImage" />
                    }
                    
                  </div>
                  <div className='tags'>{post?.postTag && <Link to={`/tags/${post?.postTag}`}>{post?.postTag}</Link>}</div>
                  <div className="admin">
                    <span>Posted By: <a href={`mailto:${post?.authorEmail}`}>{ member?.role === "admin" ? post?.postAuthor : 'Admin'}</a></span>
                  </div>
                  {/* count post contant words and paragraphs */}
                  <p className="content-count">
                    <span>Para: {post?.postContent?.length}</span> 
                    <span>Word: {post?.postContent?.join(' ')?.split(' ')?.length}</span>
                    <span>Character: {post?.postContent?.join(' ')?.split('')?.length}</span>
                  </p>
                </div>

                
                
              </div>
            </div>)
          }
    </>
  );
};

export default ShowPosts;