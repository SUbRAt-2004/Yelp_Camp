const mongoose = require('mongoose');
const Campground = require('../models/campground'); 
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp');
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${i} Camp`,
            author: '68af5b209ab0d7bf18648893',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: 'This is a description',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
      {
        url: 'https://res.cloudinary.com/djoks5zjd/image/upload/v1756570680/YelpCamp/qjz77ytvixrxoo2laz0z.jpg',
        filename: 'YelpCamp/qjz77ytvixrxoo2laz0z',
      
      },
      {
        url: 'https://res.cloudinary.com/djoks5zjd/image/upload/v1756570680/YelpCamp/o65ptjgkg8bctbc0q9mg.jpg',
        filename: 'YelpCamp/o65ptjgkg8bctbc0q9mg',

      },
      {
        url: 'https://res.cloudinary.com/djoks5zjd/image/upload/v1756570680/YelpCamp/hqp5xxoyr9ilfyni7mnh.jpg',
        filename: 'YelpCamp/hqp5xxoyr9ilfyni7mnh',
        
      },
      {
        url: 'https://res.cloudinary.com/djoks5zjd/image/upload/v1756570681/YelpCamp/kc6a7ln7vq34fv9qsm1p.jpg',
        filename: 'YelpCamp/kc6a7ln7vq34fv9qsm1p',
        
      }
    ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})