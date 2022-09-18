import React from 'react';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const Dairy = () => {
  const {data, user, member} = useData();
  const dairy = data?.filter(post => post?.postType?.toLowerCase() === "dairy" );
  const showDairy = dairy?.filter(post => member?.role !== 'admin' ? post?.postPrivacy === '127758' : post?.postPrivacy !== '' );

  return (
    <>
      <article>
        <section className="container">
          <h2>Dairy Posts:</h2>
          <br />
          {
            dairy?.length > 0 &&  <ShowPosts data={showDairy} />
             
          }
          {dairy?.length === 0 && <h3>There are no Dairy!</h3>}
          
        </section>
      </article>
    </>
  );
};

export default Dairy;