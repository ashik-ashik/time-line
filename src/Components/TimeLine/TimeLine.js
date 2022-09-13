import React from 'react';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const TimeLine = () => {
  const {data} = useData();
  const timeline = data?.filter(post => post.postType.toLowerCase() === 'timeline');
  console.log(timeline);
  return (
    <>
      <article>
        <section className="container">
          <h2>Time Line Posts:</h2>
          <br />
          {
            timeline?.length > 0 ? <ShowPosts data={timeline} />
              :
            <h3>There is no timeline posts!</h3>
          }
        </section>
      </article>
    </>
  );
};

export default TimeLine;