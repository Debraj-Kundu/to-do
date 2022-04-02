const express = require('express')
const { getList, postList, updateList, deleteList, getItem } = require("./controller")

const router = express.Router()

router.route('/').get(getList).post(postList)
router.route('/:id').patch(updateList).delete(deleteList).get(getItem)

module.exports = router