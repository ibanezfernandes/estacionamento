const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => res.send('Hello Word From Backend with NodeJs'));

module.exports = router;