import React from 'react';

const Specializations = () => {
  const specials = [
    {
      id: 1,
      title: 'Greek Salad',
      price: '.99',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Bruschetta',
      price: '.99',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic.',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Lemon Dessert',
      price: '.00',
      description: 'This comes straight from grandma\'s recipe book, every last ingredient has been sourced.',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className='specializations'>
      <div className='specializations-header'>
        <h2 className='specializations-title'>This week\'s specials!</h2>
        <button className='specializations-button'>Online Menu</button>
      </div>
      <div className='specializations-grid'>
        {specials.map((item) => (
          <div key={item.id} className='specialization-card'>
            <img src={item.image} alt={item.title} className='specialization-image' />
            <div className='specialization-content'>
              <div className='specialization-header'>
                <h3 className='specialization-name'>{item.title}</h3>
                <span className='specialization-price'>{item.price}</span>
              </div>
              <p className='specialization-description'>{item.description}</p>
              <a href='/order' className='specialization-link'>Order a delivery</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specializations;
