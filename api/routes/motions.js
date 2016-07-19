import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/motions', (req, res) => {
    const motions = [
      {
        id: '245245',
        title: 'Het Heroverwegen van de positie van de toezichthouder',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis' +
          'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '245175',
        title: 'Banken mede de financiële risico\'s laten dragen bij geborgde leningen',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '987654',
        title: 'Burgerparticipatie zonder bureaucratisering',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '642621',
        title: 'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '136743',
        title: 'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '367333',
        title: 'De totstandkoming van drinkwatertarieven',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '973533',
        title: 'Zelfcensuur als direct gevolg van bedreigingen',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '334672',
        title: 'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat ' +
          'van de toets',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '358964',
        title: 'Het weigeren van leerlingen vanwege een dubbel advies',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '195075',
        title: 'Een verbod op islamitisch thuisonderwijs',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
      {
        id: '752183',
        title: 'Evaluatie van de klankbordgroep bij vervanging van onderzeeboten',
        created_at: '2015-05-22T14:56:29.000Z',
        classification: 'Motie',
      },
    ];

    let returnData;

    if (req.query.identifier) {
      returnData = [motions.find(o => o.data.id === req.query.identifier)];
    } else {
      returnData = motions;
    }

    // async yolo
    // setTimeout(() => {
    res.json(returnData);
    // }, 500);
  }),
];
