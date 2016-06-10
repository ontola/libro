import express from 'express';
const router = express.Router();

export default [

  // See in /app/redux/modules/posts/posts.js
  router.get('/api/motions', function(req, res) {
    console.log(req.query); // example

    res.json({
      motions: [
        {
          identifier: 245245,
          title: 'Het Heroverwegen van de positie van de toezichthouder',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          arguments: [
            {
              id: 1,
              side: 'pro',
              title: 'Losse discussies doen het erg goed - eerste indruk is belangrijk',
              text: 'Dit zou een geweldig initiatief zijn zeker gezien het feit dat er een hoop mensen zijn die net buiten de regels van de voedselbank vallen die er wel heel erg bij gebaat zijn',
            },
            {
              id: 2,
              side: 'con',
              title: 'Lijkt \'actiever\', doordat het meer gefocust is',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              id: 3,
              side: 'pro',
              title: 'Niemand leest handleidingen',
              text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
            {
              id: 4,
              side: 'pro',
              title: 'Je zit niet altijd in een forum',
              text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            }
          ],
          votes: {
            result: "fail",
            result_aggs: {
              pass: 0.19,
              fail: 0.81
            },
            group_result: [
              {
                group: {
                  name: "VVD",
                },
                result: "fail",
              },
              {
                group: {
                  name: "D66",
                },
                result: "fail",
              },
              {
                group: {
                  name: "GroenLinks",
                },
                result: "fail",
              },
              {
                group: {
                  name: "PvdA",
                },
                result: "pass",
              },
            ],
            counts: [
              {
                "option": "no",
                "value": 15,
                "group": {
                  "name": "VVD"
                }
              },
              {
                "option": "no",
                "value": 9,
                "group": {
                  "name": "D66"
                }
              },
              {
                "option": "no",
                "value": 2,
                "group": {
                  "name": "GroenLinks"
                }
              },
              {
                "option": "yes",
                "value": 3,
                "group": {
                  "name": "PvdA"
                }
              },
            ],
          },
        },
        {
          identifier: 245175,
          title: 'Banken mede de financiële risico\'s laten dragen bij geborgde leningen',
          arguments: false,
          votes: false,
        },
        {
          identifier: 987654,
          title: 'Burgerparticipatie zonder bureaucratisering',
          arguments: false,
          votes: false,
        },
        {
          identifier: 642621,
          title: 'Het aanwenden van vrijvallende middelen ten behoeve van de Marker Wadden',
          arguments: false,
          votes: false,
        },
        {
          identifier: 136743,
          title: 'Uniformering van het lozingenbeleid voor mestverwerkingsinstallaties',
          arguments: false,
          votes: false,
        },
        {
          identifier: 367333,
          title: 'De totstandkoming van drinkwatertarieven',
          arguments: false,
          votes: false,
        },
        {
          identifier: 973533,
          title: 'Zelfcensuur als direct gevolg van bedreigingen',
          arguments: false,
          votes: false,
        },
        {
          identifier: 334672,
          title: 'Alle vormen van voortgezet onderwijs opnemen als mogelijk resultaat van de eindtoets',
          arguments: false,
          votes: false,
        },
        {
          identifier: 358964,
          title: 'Het weigeren van leerlingen vanwege een dubbel advies',
          arguments: false,
          votes: false,
        },
        {
          identifier: 195075,
          title: 'Een verbod op islamitisch thuisonderwijs',
          arguments: false,
          votes: false,
        },
        {
          identifier: 752183,
          title: 'Evaluatie van de klankbordgroep bij vervanging van onderzeeboten',
          arguments: false,
          votes: false,
        },
      ]
    });
  }),
];
