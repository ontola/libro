import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/documents', (req, res) => {
    const documents = {
      links: {
        self: 'http://localhost:3000/api/motions',
      },
      data: [
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=245245',
            next: 'http://localhost:3000/api/motions?identifier=973533',
          },
          data: {
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
                  { type: 'argument', id: '15' },
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
          included: [
            {
              type: 'person',
              id: '87654345678',
              attributes: {
                name: 'Han ten Broeke',
                image: 'https://www.tweedekamer.nl/sites/default/files/styles/member_parliament/public/7892_13.jpg',
              },
            },
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
            {
              type: 'vote_event',
              id: '21',
              attributes: {
                result: 'fail',
              },
              relationships: {
                counts: {
                  data: [
                    {
                      type: 'count',
                      id: '31',
                    },
                    {
                      type: 'count',
                      id: '32',
                    },
                    {
                      type: 'count',
                      id: '33',
                    },
                    {
                      type: 'count',
                      id: '34',
                    },
                  ],
                },
                votes: {
                  data: [
                    {
                      type: 'vote',
                      id: '41',
                    },
                  ],
                },
              },
            },
            {
              type: 'count',
              id: '31',
              attributes: {
                option: 'no',
                value: 15,
                name: 'VVD',
              },
            },
            {
              type: 'count',
              id: '32',
              attributes: {
                option: 'no',
                value: 9,
                name: 'D66',
              },
            },
            {
              type: 'count',
              id: '33',
              attributes: {
                option: 'no',
                value: 2,
                name: 'GroenLinks',
              },
            },
            {
              type: 'count',
              id: '34',
              attributes: {
                option: 'yes',
                value: 3,
                name: 'PvdA',
              },
            },
            {
              type: 'vote',
              id: '41',
              attributes: {
                individual: true,
                value: 'yes',
              },
            },
          ],
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=245175',
            next: 'http://localhost:3000/api/motions?identifier=987654',
            last: 'http://localhost:3000/api/motions?identifier=245245',
          },
          data: {
            type: 'motion',
            id: '245175',
            attributes: {
              title: 'Banken mede de financiële risico\'s laten dragen bij geborgde leningen',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=987654',
            next: 'http://localhost:3000/api/motions?identifier=642621',
            last: 'http://localhost:3000/api/motions?identifier=245175',
          },
          data: {
            type: 'motion',
            id: '987654',
            attributes: {
              title: 'Burgerparticipatie zonder bureaucratisering',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=642621',
            next: 'http://localhost:3000/api/motions?identifier=136743',
            last: 'http://localhost:3000/api/motions?identifier=987654',
          },
          data: {
            type: 'motion',
            id: '642621',
            attributes: {
              title: 'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=136743',
            next: 'http://localhost:3000/api/motions?identifier=367333',
            last: 'http://localhost:3000/api/motions?identifier=642621',
          },
          data: {
            type: 'motion',
            id: '136743',
            attributes: {
              title: 'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=367333',
            next: 'http://localhost:3000/api/motions?identifier=973533',
            last: 'http://localhost:3000/api/motions?identifier=136743',
          },
          data: {
            type: 'motion',
            id: '367333',
            attributes: {
              title: 'De totstandkoming van drinkwatertarieven',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=973533',
            next: 'http://localhost:3000/api/motions?identifier=334672',
            last: 'http://localhost:3000/api/motions?identifier=367333',
          },
          data: {
            type: 'motion',
            id: '973533',
            attributes: {
              title: 'Zelfcensuur als direct gevolg van bedreigingen',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=334672',
            next: 'http://localhost:3000/api/motions?identifier=358964',
            last: 'http://localhost:3000/api/motions?identifier=973533',
          },
          data: {
            type: 'motion',
            id: '334672',
            attributes: {
              title: 'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat ' +
                'van de toets',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=358964',
            next: 'http://localhost:3000/api/motions?identifier=195075',
            last: 'http://localhost:3000/api/motions?identifier=334672',
          },
          data: {
            type: 'motion',
            id: '358964',
            attributes: {
              title: 'Het weigeren van leerlingen vanwege een dubbel advies',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=195075',
            next: 'http://localhost:3000/api/motions?identifier=752183',
            last: 'http://localhost:3000/api/motions?identifier=358964',
          },
          data: {
            type: 'motion',
            id: '195075',
            attributes: {
              title: 'Een verbod op islamitisch thuisonderwijs',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
        {
          links: {
            self: 'http://localhost:3000/api/motions?identifier=752183',
            last: 'http://localhost:3000/api/motions?identifier=195075',
          },
          data: {
            type: 'motion',
            id: '752183',
            attributes: {
              title: 'Evaluatie van de klankbordgroep bij vervanging van onderzeeboten',
              created_at: '2015-05-22T14:56:29.000Z',
              classification: 'Motie',
            },
          },
        },
      ],
    };

    let returnData;

    if (req.query.identifier) {
      returnData = {
        data: [documents.data.find(o => o.data.id === req.query.identifier)],
      };
    } else {
      returnData = documents;
    }

    // async yolo
    // setTimeout(() => {
    res.json(returnData);
    // }, 500);
  }),
];
