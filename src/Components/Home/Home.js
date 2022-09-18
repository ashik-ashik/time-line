import React from 'react';
import "../../Styles/Layouts/Layouts.scss";
import useData from '../../hooks/useData/UseData';
import Post from './Post/Post';
import { Link } from 'react-router-dom';
import ShowPosts from '../ShowPosts/ShowPosts';

const Home = () => {
  const {data, user, member} = useData();
  const publicPosts = data?.filter(post => member?.role === 'admin' ? post?.postPrivacy !== '' : post?.postPrivacy === '127758');

  return (
    <>
      <article>
        <section className="container">
          {
            member?.role === "admin" && <Post />
          }

          {
            data?.length > 0 ? <ShowPosts data={user?.user?.email !== 'ashik.free999@gmail.com' ? publicPosts : data} /> 
              :
            <h3>There are no post available!</h3>
          }         
        </section>
        
      </article>
    </>
  );
};

export default Home;