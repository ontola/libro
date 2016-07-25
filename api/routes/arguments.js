import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/arguments', (req, res) => {
    const argumentations = [
      {
        type: 'argument',
        id: '11',
        attributes: {
          title: 'Losse discussies doen het erg goed - eerste indruk is belangrijk',
          text: 'Dit zou een geweldig initiatief zijn zeker gzien het feit dat er een hoop ' +
            'mensen zijn die net buiten de regels van de voedelbank vallen die er wel heel ' +
            'erg bij gebaat zijn',
          side: 'pro',
          created_at: '2015-05-22T14:56:29.000Z',
          vote_count: 0,
        },
      },
      {
        type: 'argument',
        id: '12',
        attributes: {
          title: 'Lijkt \'actiever\', doordat het meer gefocust is',
          text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tem.',
          side: 'pro',
          created_at: '2015-05-22T14:56:29.000Z',
          vote_count: 4,
        },
      },
      {
        type: 'argument',
        id: '13',
        attributes: {
          title: 'Niemand leest handleidingen',
          side: 'pro',
          created_at: '2015-05-22T14:56:29.000Z',
          vote_count: 135,
        },
      },
      {
        type: 'argument',
        id: '14',
        attributes: {
          title: 'Je zit niet altijd in een forum',
          text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
          side: 'con',
          created_at: '2015-05-22T14:56:29.000Z',
          vote_count: 34,
        },
      },
    ];

    let returnData;

    if (req.query.identifier) {
      returnData = {
        data: argumentations.find(o => o.id === req.query.identifier),
      };
    } else {
      returnData = {
        data: argumentations,
      };
    }

    // async yolo
    // setTimeout(() => {
    res.json(returnData);
    // }, 2000);
  }),
];
