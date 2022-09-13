import React from 'react';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const Dairy = () => {
  const {data, user} = useData();
  const dairy = data?.filter(post => post?.postType?.toLowerCase() === "dairy" );
  const publicDairy = dairy?.filter(post => post?.postPrivacu === '127758')
  return (
    <>
      <article>
        <section className="container">
          <h2>Dairy Posts:</h2>
          <br />
          {
            dairy?.length > 0 &&  <ShowPosts data={user?.user?.email?.includes("ashik.") ? dairy : publicDairy} />
             
          }
          {publicDairy?.length === 0 && <h3>There are no Dairy!</h3>}
          
        </section>
      </article>
    </>
  );
};

export default Dairy;