export default `[
  ({
    '@id': 'https://argu.localdev/d/page/example',
    [rdfx.type]: argu.Motion,
    [schema.dateCreated]: date("1993-04-12T12:32:45"),
    [schema.name]: 'Voetbal moet doorgaan!',
    [schema.text]: \`Geen bal op het veld is als geen pils in het glas.

  Gewoon lekker dat balletje trappen!\`,
    [schema.creator]: {
      [rdfx.type]: schema.Person,
      [schema.name]: 'Johan',
      [schema.image]: {
          [rdfx.type]: schema.ImageObject,
          [schema.thumbnail]: url('https://video-images.vice.com/articles/5c7fa9c573bc8c0007df28f7/lede/1551877004855-Johan-Cruijffs-Amsterdam-Cruyff-Betondorp-Johan_Cruijff_Bestanddeelnr_928-0908.jpeg'),
      },
    },
    [schema.comment]: {
       [rdfx.type]: rdfx.Seq,
       [rdfx.ns('_1')]: {
           [rdfx.type]: argu.Comment,
           [schema.text]: 'my comment',
       },
       [rdfx.ns('_2')]: {
           [rdfx.type]: argu.Comment,
           [schema.text]: 'Wow!',
           [schema.creator]: {
             [rdfx.type]: schema.Person,
             [schema.name]: 'Henk Lammerendam',
           },
       },
       [rdfx.ns('_3')]: {
           [rdfx.type]: argu.Comment,
           [schema.text]: 'Hier kan ik me in vinden!',
           [schema.creator]: {
             [rdfx.type]: schema.Person,
             [schema.name]: 'Eduard de Koninck',
           },
       },
    },
  })
]`;
