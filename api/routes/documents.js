import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/documents', (req, res) => {
    const documents = [
      {
        type: 'motion',
        id: '245245',
        attributes: {
          title: 'Het Heroverwegen van de positie van de toezichthouder',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui' +
            'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
        relationships: {
          creator: {
            data: {
              type: 'person',
              id: '87654345678',
            },
          },
          arguments: {
            data: [
              { type: 'argument', id: '11' },
              { type: 'argument', id: '12' },
              { type: 'argument', id: '13' },
              { type: 'argument', id: '14' },
            ],
          },
          vote_event: {
            data: {
              type: 'vote_event',
              id: '21',
            },
          },
        },
      },
      {
        type: 'motion',
        id: '245175',
        attributes: {
          title: 'Banken mede de financiële risico\'s laten dragen bij geborgde leningen',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '987654',
        attributes: {
          title: 'Burgerparticipatie zonder bureaucratisering',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '642621',
        attributes: {
          title: 'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '136743',
        attributes: {
          title: 'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '367333',
        attributes: {
          title: 'De totstandkoming van drinkwatertarieven',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '973533',
        attributes: {
          title: 'Zelfcensuur als direct gevolg van bedreigingen',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '334672',
        attributes: {
          title: 'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat ' +
            'van de toets',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '358964',
        attributes: {
          title: 'Het weigeren van leerlingen vanwege een dubbel advies',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '195075',
        attributes: {
          title: 'Een verbod op islamitisch thuisonderwijs',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
      {
        type: 'motion',
        id: '752183',
        attributes: {
          title: 'Evaluatie van de klankbordgroep bij vervanging van onderzeeboten',
          created_at: '2015-05-22T14:56:29.000Z',
          classification: 'Motie',
        },
      },
    ];

    let returnData;


    if (req.query.identifier) {
      returnData = {
        data: documents.find(o => o.id === req.query.identifier),
      };
    } else {
      returnData = {
        data: documents,
      };
    }

    // async yolo
    // setTimeout(() => {
    res.json(returnData);
    // }, 500);
  }),
];
