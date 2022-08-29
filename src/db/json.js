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

const post = ({title, descBig, descLittle, img, priceCurrent, pricePrevious, rating}) => {
  const note = readingNotes();
  console.log(note)

  const copy = note.items.find(note => note.item.title === title);
  if (!copy) {
    note.items.push({
      item: {
        title: title,
        big: descBig,
        little: descLittle,
        img: img,
        price: {
          current: priceCurrent,
          previous: pricePrevious,
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
  title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
  descBig: 'Eligible for Shipping To Mars or somewhere else',
  descLittle: 'Eligible for Shipping To Mars or somewhere else',
  img: '../img/items/item1.jpg',
  priceCurrent: '$50',
  pricePrevious: '$100',
  rating: 5
})

post({
  title: 'Lee Pucker design. Leather botinki for handsome designers. Free shipping.',
  descBig: '',
  descLittle: '',
  img: '../img/items/item2.jpg',
  priceCurrent: '$14',
  pricePrevious: '$25',
  rating: 4.5
})

post({
  title: 'Timesaving kitten to save months on development. Playful, cute, cheap!',
  descBig: 'Eligible for nothing :(',
  descLittle: 'Eligible for nothing :(',
  img: '../img/items/item3.jpg',
  priceCurrent: '$128',
  pricePrevious: '$135',
  rating: 5
})