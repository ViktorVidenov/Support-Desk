const express = require('express')
const router = express.Router()
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

//Re-router into note router (Router for note)
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router