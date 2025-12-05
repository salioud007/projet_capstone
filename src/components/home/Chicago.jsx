import React from 'react';

const Chicago = () => {
  return (
    <section className='chicago'>
      <div className='chicago-content'>
        <h2 className='chicago-title'>Little Lemon Chicago</h2>
        <p className='chicago-description'>
          Little Lemon is owned by two Italian brothers, Mario and Adrian, 
          who moved to the United States to pursue their shared dream of 
          owning a restaurant.
        </p>
        <p className='chicago-description'>
          To craft the menu, Mario relies on family recipes and his experience 
          as a chef in Italy. Adrian does all the marketing for the restaurant 
          and led the effort to expand the menu beyond classic Italian to 
          incorporate additional cuisines from the Mediterranean region.
        </p>
      </div>
      <div className='chicago-images'>
        <img 
          src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
          alt='Mario and Adrian' 
          className='chicago-image-main'
        />
        <img 
          src='https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
          alt='Restaurant interior' 
          className='chicago-image-secondary'
        />
      </div>
    </section>
  );
};

export default Chicago;
