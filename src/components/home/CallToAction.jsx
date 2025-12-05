import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className='call-to-action'>
      <div className='call-to-action-content'>
        <h1 className='call-to-action-title'>Little Lemon</h1>
        <h2 className='call-to-action-subtitle'>Chicago</h2>
        <p className='call-to-action-description'>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </p>
        <Link to='/booking' className='call-to-action-button'>
          Reserve a Table
        </Link>
      </div>
      <div className='call-to-action-image'>
        <img 
          src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' 
          alt='Little Lemon Restaurant' 
        />
      </div>
    </section>
  );
};

export default CallToAction;
