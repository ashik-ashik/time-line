import React from 'react';
import "../../Styles/Layouts/Layouts.scss";
import useData from '../../hooks/useData/UseData';
import Post from './Post/Post';
import { Link } from 'react-router-dom';
import ShowPosts from '../ShowPosts/ShowPosts';

const Home = () => {
  const {data, user, member} = useData();
  const publicPosts = data?.filter(post => member?.role === 'admin' ? post?.postPrivacy !== '' : post?.postPrivacy === '127758');
  // const publicPosts = data?.filter(post =>  post?.postPrivacy !== '');

  if(!data || !member){
    return <div className="container">
      <h3>Loading...</h3>
    </div>
  }
  return (
    <>
      <article>
        <section className="container">
          {
            <>
              <ul className='mini-menu'>
                <li>
                  <Link to='/mybooks'>My Books</Link>
                </li>
                <li>
                  <Link to='/todo'>ToDo</Link>
                </li>
                <li>
                  <Link to='/strategy'>Strategy</Link>
                </li>
              </ul>
            </>
          }

          {
            data?.length > 0 ? <ShowPosts maxCon={'...'} data={user?.user?.email !== 'ashik.free999@gmail.com' ? publicPosts : data} /> 
              :
            <h3>There are no post available!</h3>
          }         
        </section>
        
      </article>
    </>
  );
};

export default Home;