import React from 'react';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const Dairy = () => {
  const {data, member} = useData();
  const dairy = data?.filter(post => post?.postType?.toLowerCase() === "dairy" );
  const showDairy = dairy?.filter(({postPrivacy}) => (member?.role === 'viewer' && postPrivacy === '127758') || (member?.role === 'special' && postPrivacy === '128101') || (member?.role === 'admin' && postPrivacy !== '') );
  console.log(member);
  return (
    <>
      <article>
        <section className="container">
          <h2>Dairy Posts:</h2>
          <br />
          {
            dairy?.length > 0 &&  <ShowPosts  maxCon={'...'} data={showDairy} />
             
          }
          {dairy?.length === 0 && <h3>There are no Dairy!</h3>}
          
        </section>
      </article>
    </>
  );
};

export default Dairy;