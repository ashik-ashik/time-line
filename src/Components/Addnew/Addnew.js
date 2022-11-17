import React from 'react';
import useData from '../../hooks/useData/UseData';
import Post from '../Home/Post/Post';

const Addnew = () => {
  const {member} = useData();
  // console.log(member?.role);
  // member?.role === "admin" && 
  return (
    <article>
      <section className="container">
        {
          member?.role === "admin" && <Post />
        }
      </section>
    </article>
  );
};

export default Addnew;