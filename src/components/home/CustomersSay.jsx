import React from 'react';

const CustomersSay = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      review: 'The best Mediterranean food in Chicago!',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      review: 'Amazing atmosphere and delicious food.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      rating: 5,
      review: 'The lemon dessert is to die for!',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      rating: 5,
      review: 'Perfect for family dinners. Highly recommend!',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  return (
    <section className='customers-say'>
      <h2 className='customers-say-title'>Testimonials</h2>
      <div className='testimonials-grid'>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className='testimonial-card'>
            <div className='testimonial-rating'>
              {'★'.repeat(testimonial.rating)}
              {'☆'.repeat(5 - testimonial.rating)}
            </div>
            <div className='testimonial-user'>
              <img src={testimonial.image} alt={testimonial.name} className='testimonial-avatar' />
              <span className='testimonial-name'>{testimonial.name}</span>
            </div>
            <p className='testimonial-review'>{testimonial.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomersSay;
