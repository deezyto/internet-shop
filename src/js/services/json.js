const fs = require('fs');

const readingNotes = () => {
  try {
    const data = fs.readFileSync('items.json');
    const parse = JSON.parse(data);
    return parse;
  } catch {
    return {items: [

    ]};
  }
}

const post = ({id, title, descBig, descLittle, img, yearManufacturing, expiration, 
              priceCurrent, recommendet, dateCreate, deliveryFast, deliveryEconom,
              deliveryFree, pricePrevious, priceType, rating}) => {
  const note = readingNotes();
  console.log(note)

  const copy = note.items.find(note => note.item.title === title);
  if (!copy) {
    note.items.push({
      item: {
        id: id,
        title: title,
        big: descBig,
        little: descLittle,
        img: img,
        delivery: {
          fast: deliveryFast,
          econom: deliveryEconom,
          free: deliveryFree
        },
        dateCreate: dateCreate,
        recommendet: recommendet,
        yearManufacturing: yearManufacturing,
        expiration: expiration,
        price: {
          current: priceCurrent,
          previous: pricePrevious,
          type: priceType
        },
        rating: rating
      },
    })
    save(note);
    console.log('Note publishing');
  } else {
    console.log('Note dublicate');
  }
  
}

const save = (note) => {
  fs.writeFileSync('items.json', JSON.stringify(note));
}

post({
  id: 1,
  title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
  descBig: 'Eligible for Shipping To Mars or somewhere else',
  descLittle: 'Eligible for Shipping To Mars or somewhere else',
  img: '../img/items/item1.jpg',
  priceCurrent: '$50',
  pricePrevious: '$100',
  rating: 5,
  priceType: 'auction',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: false,
  dateCreate: '2022-08-01',
  recommendet: true,
  yearManufacturing: '2010',
  expiration: '10.09.2022',
})

post({
  id: 2,
  title: 'Lee Pucker design. Leather botinki for handsome designers. Free shipping.',
  descBig: '',
  descLittle: '',
  img: '../img/items/item2.jpg',
  priceCurrent: '$14',
  pricePrevious: '$25',
  rating: 4.5,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-07-20',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 3,
  title: 'Timesaving kitten to save months on development. Playful, cute, cheap!',
  descBig: 'Eligible for nothing :(',
  descLittle: 'Eligible for nothing :(',
  img: '../img/items/item3.jpg',
  priceCurrent: '$128',
  pricePrevious: '$135',
  rating: 5,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-07-25',
  recommendet: true,
  yearManufacturing: '2014',
  expiration: null,
})

post({
  id: 4,
  title: 'Plastic useless plugs and tubes for high-fidelity prototyping. Fit & Eat!',
  descBig: 'Wordwide shitting available Buyers protection possible!',
  descLittle: 'Wordwide shitting available Buyers protection possible!',
  img: '../img/items/item4.jpg',
  priceCurrent: '$14',
  pricePrevious: '$16',
  rating: 5,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-07-20',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 5,
  title: 'Creativity stimulating lotion. Drink every morning to generate better ideas!',
  descBig: 'Wordwide shifting available Buyers protection possible!',
  descLittle: 'Wordwide shifting available Buyers protection possible!',
  img: '../img/items/item5.jpg',
  priceCurrent: '$11',
  pricePrevious: '$15',
  rating: 4.4,
  priceType: 'buyNow',
  deliveryFast: false,
  deliveryEconom: true,
  deliveryFree: false,
  dateCreate: '2022-07-20',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 6,
  title: 'Prototyping items to create a lot if useless things...',
  descBig: 'Showcasing onHovered state',
  descLittle: 'Showcasing onHovered state',
  img: '../img/items/item6.jpg',
  priceCurrent: '$128',
  pricePrevious: '$150',
  rating: 4,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: false,
  deliveryFree: false,
  dateCreate: '2022-07-20',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 7,
  title: 'Von SPRING',
  descBig: 'Wordwide shitting available Buyers protection possible!',
  descLittle: 'Wordwide shitting available Buyers protection possible!',
  img: '../img/items/item7.jpg',
  priceCurrent: '$14',
  pricePrevious: '$20',
  rating: 4,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-04-05',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 8,
  title: 'Envelope, Stripes, Pencil and etc. Purchase this kit today and feel OKAY',
  descBig: 'Eligible for Shipping To Mars or somewhere else',
  descLittle: 'Eligible for Shipping To Mars or somewhere else',
  img: '../img/items/item8.jpg',
  priceCurrent: '$9.5',
  pricePrevious: '$10',
  rating: 5,
  priceType: 'buyNow',
  deliveryFast: false,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-08-16',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 9,
  title: 'Professional teadrinking set for every designer and developer',
  descBig: 'Eligible for nothing :(',
  descLittle: 'Eligible for nothing :(',
  img: '../img/items/item9.jpg',
  priceCurrent: '$145',
  pricePrevious: '$180',
  rating: 5,
  priceType: 'auction',
  deliveryFast: false,
  deliveryEconom: true,
  deliveryFree: false,
  dateCreate: '2022-06-10',
  recommendet: false,
  yearManufacturing: '2008',
  expiration: '25.10.2022',
})

post({
  id: 10,
  title: 'One string Bonsai description',
  descBig: 'Wordwide shifting available Buyers protection possible!',
  descLittle: 'Wordwide shifting available Buyers protection possible!',
  img: '../img/items/item10.jpg',
  priceCurrent: '$11.6',
  pricePrevious: '$15',
  rating: 4.3,
  priceType: 'buyNow',
  deliveryFast: true,
  deliveryEconom: true,
  deliveryFree: true,
  dateCreate: '2022-01-10',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 11,
  title: 'MakeUp',
  descBig: 'Eligible for Shipping To Mars or somewhere else',
  descLittle: 'Eligible for Shipping To Mars or somewhere else',
  img: '../img/items/item11.jpg',
  priceCurrent: '$20',
  pricePrevious: '$25',
  rating: 4.7,
  priceType: 'buyNow',
  deliveryFast: false,
  deliveryEconom: true,
  deliveryFree: false,
  dateCreate: '2022-06-04',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})

post({
  id: 12,
  title: 'Simply best item in town to shine bright with your Nine Inch Nails',
  descBig: 'Eligible for Shipping To Mars or somewhere else',
  descLittle: 'Eligible for Shipping To Mars or somewhere else',
  img: '../img/items/item12.jpg',
  priceCurrent: '$1.2',
  pricePrevious: '$2',
  rating: 4.3,
  priceType: 'buyNow',
  deliveryFast: false,
  deliveryEconom: true,
  deliveryFree: false,
  dateCreate: '2022-08-10',
  recommendet: true,
  yearManufacturing: '2012',
  expiration: null,
})