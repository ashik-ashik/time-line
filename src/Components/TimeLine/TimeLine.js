import React from 'react';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const TimeLine = () => {
  const {data, member} = useData();
  const timeline = data?.filter(post => post.postType.toLowerCase() === 'timeline' );
  const showTimeline = timeline?.filter(({postPrivacy}) => (member?.role === "viewer" && postPrivacy === "127758") || (member?.role === 'special' && postPrivacy !== '128101') || (member?.role === "admin" && postPrivacy !== ""));
  // console.log(timeline);
  return (
    <>
      <article>
        <section className="container">
          <h2>Time Line Posts:</h2>
          <br />
          {
            timeline?.length > 0 ? <ShowPosts maxCon={'...'} data={showTimeline} />
              :
            <h3>There is no timeline posts!</h3>
          }
        </section>
      </article>
    </>
  );
};

export default TimeLine;