import React from 'react'
import { useGetBooksOnTrendQuery } from '../store/bookApiSetup';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/shared/Banner';

const Home = () => {
  const navigate = useNavigate(); 
  const { data, error, isLoading } = useGetBooksOnTrendQuery();

  if (isLoading) return <></>;
  if (error) {
    console.log(error);
    navigate(`/501`);
  }

console.log(data);
  return (
    <>
    <h1 className='text-light'>TOP OF THE WEEK!</h1>
        <Banner books={data!}/>
    </>
  )
}

export default Home