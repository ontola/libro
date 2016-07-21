import express from 'express';
const router = new express.Router();

export default [
  router.get('/api/persons', (req, res) => {
    const persons = {
      data: [
        {
          data: {
            type: 'person',
            id: 123456789876543,
            attributes: {
              name: 'Salima Belhaj',
              image: 'https://www.tweedekamer.nl/sites/default/files/styles/member_parliament/' +
                'public/8351_0.jpg',
              biography: 'Ik vind het belangrijk dat politici met elkaar van gedachten wisselen. ' +
                'Maar daar moet het niet bij blijven; de politiek moet ook resultaten boeken. ',
              party: 'D66',
            },
          },
        },
        {
          data: {
            type: 'person',
            id: 87654345678,
            attributes: {
              name: 'Han ten Broeke',
              image: 'https://www.tweedekamer.nl/sites/default/files/styles/member_parliament/' +
                'public/7892_13.jpg',
              biography: 'Ik heb altijd in de politiek gewild. Toen ik amper 5 jaar was, tekende ' +
                'ik Joop den Uyl al na uit de krant. Voor mijn familie is het dan ook geen ' +
                'verrassing dat ik na een carrière in het bedrijfsleven nu in de Tweede Kamer ' +
                'terecht ben gekomen, al is het dan niet voor de PvdA. Zoals zoveel van mijn ' +
                'generatiegenoten werd de echte politike opvatting vooral bepaald door het debat ' +
                'over de plaatsing van kruisraketten in het begin van de jaren 80. Ik was daar ' +
                'voor. De meeste van mijn klasgnoten en alle leraren waren tegen. Toen maakte ik ' +
                'de keus voor de VVD van Nijpels: Edje Raketje, inderdaad!',
              party: 'VVD',
            },
          },
        },
        {
          data: {
            type: 'person',
            id: 234567985462,
            attributes: {
              name: 'Pia Dijkstra',
              image: 'https://www.tweedekamer.nl/sites/default/files/styles/member_parliament/' +
                'public/8079_13.jpg',
              biography: 'Veel mensen kennen mij waarschijnlijk van tevisie. Ik heb jarenlang het' +
                'NOS 8 uur journaal gepresenteerd en werkte hiervoor als presentatrice voor de ' +
                'AVRO. Of ik voordeel heb van mijn bekendheid? Misschie wel, mensen weten in elk ' +
                'geval wie ik ben en wat ik doe. Tijdens mijn journalistiekloopbaan had ik al wel' +
                'veel met politiek te maken. Je kunt dan aanbevelingedoen, maar staat meer aan de' +
                'zijlijn. Nu ik in de Tweede Kamer zit, kan ik daadwerkelijk een bijdrage leveren' +
                'aan de toekomst.',
              party: 'D66',
            },
          },
        },
        {
          data: {
            type: 'person',
            id: 7362134784,
            attributes: {
              name: 'Rik Grashoff',
              image: 'https://www.tweedekamer.nl/sites/default/files/styles/member_parliament/public/8042_1.jpg?itok=iVPVI6zL',
              biography: 'Ik ben GroenLinkser van het eerste uur en ben verknocht aan de lokale ' +
                'politiek. Twintig jaar geleden was ik b trokken bij de oprichting van de partij ' +
                'en jarenlang was ik wethouder in Det en Rotterdam. Van 23 november 2010 tot 20 ' +
                'september 2012 was ik al lid n de Tweede Kamer. Daarna, van 3 maart 2013 tot 12 ' +
                'mei 2015, was ik voorzitter van GroenLinks.',
              party: 'GroenLinks',
            },
          },
        },
      ],
    };

    let returnData;

    if (req.query.identifier) {
      returnData = [persons.find(o => o.id === Number(req.query.id))];
    } else {
      returnData = persons;
    }

    // async yolo
    // setTimeout(() => {
    res.json(returnData);
    // }, 2000);
  }),
];
