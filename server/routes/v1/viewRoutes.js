const { Router } = require('express');
const viewController = require('@controllers/viewController');

const router = Router();

router.get('/', viewController.index);
export default router;
