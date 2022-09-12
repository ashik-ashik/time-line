import React from 'react';
import "../../Styles/Layouts/Layouts.scss";
import useData from '../../hooks/useData/UseData';
import Post from './Post/Post';

const Home = () => {
  const data = useData();
  return (
    <>
      <article>
        <section className="container">
          <Post />
        </section>
      </article>
    </>
  );
};

export default Home;