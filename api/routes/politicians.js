import express from 'express';
const router = express.Router();

export default [
  router.get('/api/politicians', function(req, res) {
    res.json({
      politicians: [
        { identifier: 0, fullName: 'A. Pechtold', party: 'D66' },
        { identifier: 1, fullName: 'H. Zijlstra', party: 'VVD' },
        { identifier: 2, fullName: 'T. Elias', party: 'VVD' },
        { identifier: 3, fullName: 'E. Roemer', party: 'SP' },
        { identifier: 4, fullName: 'S. van Haersma Buma', party: 'CDA' },
      ]
    });
  })
];
