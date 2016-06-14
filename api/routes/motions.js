import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/motions', (req, res) => {
    const motions = [
      {
        identifier: 245245,
        title: 'Het Heroverwegen van de positie van de toezichthouder',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ' +
          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ' +
          'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ' +
          'aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat ' +
          'nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui' +
          'officia deserunt mollit anim id est laborum.',
        relations: {
          nextMotion: 245175,
          previousMotion: null,
        },
        arguments: [
          {
            id: 1,
            side: 'pro',
            title: 'Losse discussies doen het erg goed - eerste indruk is belangrijk',
            text: 'Dit zou een geweldig initiatief zijn zeker gezien het feit dat er een hoop ' +
              'mensen zijn die net buiten de regels van de voedselbank vallen die er wel heel ' +
              'erg bij gebaat zijn',
          },
          {
            id: 2,
            side: 'con',
            title: 'Lijkt \'actiever\', doordat het meer gefocust is',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tem.',
          },
          {
            id: 3,
            side: 'pro',
            title: 'Niemand leest handleidingen',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
          },
          {
            id: 4,
            side: 'pro',
            title: 'Je zit niet altijd in een forum',
            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
          },
        ],
        votes: {
          result: 'fail',
          result_aggs: {
            pass: 0.19,
            fail: 0.81,
          },
          group_result: [
            {
              group: {
                name: 'VVD',
              },
              result: 'fail',
            },
            {
              group: {
                name: 'D66',
              },
              result: 'fail',
            },
            {
              group: {
                name: 'GroenLinks',
              },
              result: 'fail',
            },
            {
              group: {
                name: 'PvdA',
              },
              result: 'pass',
            },
          ],
          counts: [
            {
              option: 'no',
              value: 15,
              group: {
                name: 'VVD',
              },
            },
            {
              option: 'no',
              value: 9,
              group: {
                name: 'D66',
              },
            },
            {
              option: 'no',
              value: 2,
              group: {
                name: 'GroenLinks',
              },
            },
            {
              option: 'yes',
              value: 3,
              group: {
                name: 'PvdA',
              },
            },
          ],
        },
      },
      {
        identifier: 245175,
        title: 'Banken mede de financiële risico\'s laten dragen bij geborgde leningen',
        relations: {
          nextMotion: 987654,
          previousMotion: 245245,
        },
      },
      {
        identifier: 987654,
        title: 'Burgerparticipatie zonder bureaucratisering',
        relations: {
          nextMotion: 642621,
          previousMotion: 245245,
        },
      },
      {
        identifier: 642621,
        title: 'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
        relations: {
          nextMotion: 136743,
          previousMotion: 987654,
        },
      },
      {
        identifier: 136743,
        title: 'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
        relations: {
          nextMotion: 367333,
          previousMotion: 642621,
        },
      },
      {
        identifier: 367333,
        title: 'De totstandkoming van drinkwatertarieven',
        relations: {
          nextMotion: 973533,
          previousMotion: 136743,
        },
      },
      {
        identifier: 973533,
        title: 'Zelfcensuur als direct gevolg van bedreigingen',
        relations: {
          nextMotion: 334672,
          previousMotion: 367333,
        },
      },
      {
        identifier: 334672,
        title: 'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat van de toets',
        relations: {
          nextMotion: 358964,
          previousMotion: 973533,
        },
      },
      {
        identifier: 358964,
        title: 'Het weigeren van leerlingen vanwege een dubbel advies',
        relations: {
          nextMotion: 195075,
          previousMotion: 334672,
        },
      },
      {
        identifier: 195075,
        title: 'Een verbod op islamitisch thuisonderwijs',
        relations: {
          nextMotion: 752183,
          previousMotion: 358964,
        },
      },
      {
        identifier: 752183,
        title: 'Evaluatie van de klankbordgroep bij vervanging van onderzeeboten',
        relations: {
          nextMotion: null,
          previousMotion: 195075,
        },
      },
    ];

    let returnData;

    if (req.query.identifier) {
      returnData = [motions.find(o => o.identifier === Number(req.query.identifier))];
    } else {
      returnData = motions;
    }

    // async yolo
    // setTimeout(function(){
    res.json(returnData);
    // }, 200);
  }),
];
