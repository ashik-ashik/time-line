import React from 'react';
import "../../Styles/Layouts/Layouts.scss";
import useData from '../../hooks/useData/UseData';
import { Link } from 'react-router-dom';
import ShowPosts from '../ShowPosts/ShowPosts';
import Loader from '../Common/Loader/Loader';

const Home = () => {
  const {data, user, member} = useData();
  if(!data || !member || !user?.user){
    return <Loader />

  }
  const {role} = member;
  const publicPosts = data?.filter(({postPrivacy}) => ((role === 'viewer' || !role) && postPrivacy === '127758') || (role === 'special' && postPrivacy === '128101') || (role === 'admin' && postPrivacy !== '') );
  // const publicPosts = data?.filter(post =>  post?.postPrivacy !== '');
  // console.log(publicPosts);


  return (
    <>
      <article>
        <section className="container">
          {((role === 'admin') || (role === 'special')) && <>
              <ul className='mini-menu'>
                <li>
                  <Link to='/mybooks'>My Books</Link>
                </li>
                <li>
                  <Link to='/todo'>ToDo</Link>
                </li>
                {<li>
                  <Link to='/320'>R 320</Link>
                </li>}
                <li>
                  <Link to='/passwords'>Passwords</Link>
                </li>
              </ul>
            </>
          }

          {
            data?.length > 0 ? <ShowPosts maxCon={'...'} data={publicPosts} /> 
              :
            <h3>There are no post available!</h3>
          }         
        </section>
        
      </article>
    </>
  );
};

export default Home;