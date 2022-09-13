import React from 'react';
import "../../Styles/Layouts/Layouts.scss";
import useData from '../../hooks/useData/UseData';
import Post from './Post/Post';
import { Link } from 'react-router-dom';
import ShowPosts from '../ShowPosts/ShowPosts';

const Home = () => {
  const {data} = useData();
  const publicPosts = data?.filter(post => post?.postPrivacy === '127758')
  console.log(data);

  return (
    <>
      <article>
        <section className="container">
          <Post />
          <ShowPosts data={publicPosts} />          
        </section>
        
      </article>
    </>
  );
};

export default Home;