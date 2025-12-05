import React from 'react';
import CallToAction from '../components/home/CallToAction';
import Specializations from '../components/home/Specializations';
import CustomersSay from '../components/home/CustomersSay';
import Chicago from '../components/home/Chicago';

const HomePage = () => {
  return (
    <main className='main'>
      <div className='container'>
        <CallToAction />
        <Specializations />
        <CustomersSay />
        <Chicago />
      </div>
    </main>
  );
};

export default HomePage;
