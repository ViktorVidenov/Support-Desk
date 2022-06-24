const express = require('express')
//export note router to get in ticketRoutes
const router = express.Router({ mergeParams: true })
const { getNotes, addtNote } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addtNote )
 
module.exports = router

// Path and how ti be formated - /api/tickets/:ticketId/notes