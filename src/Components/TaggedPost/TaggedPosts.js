import React from 'react';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import ShowPosts from '../ShowPosts/ShowPosts';

const TaggedPosts = () => {
  const {data} = useData();
  const {tagName} = useParams();
  const findTagged = data?.filter(post => post?.postTag === tagName)

  return (
    <article>
      <section className="container">
        <ShowPosts data={findTagged} />
      </section>
    </article>
  );
};

export default TaggedPosts;