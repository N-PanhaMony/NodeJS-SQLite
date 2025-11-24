import express from 'express'
import db from '../db.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Protect all routes
router.use(authMiddleware)

// GET all todos for logged user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// CREATE a new todo
router.post('/', (req, res) => {
    const { task } = req.body

    const addTodo = db.prepare(`
        INSERT INTO todos (user_id, task) VALUES (?, ?)
    `)

    const result = addTodo.run(req.userId, task)

    res.status(201).json({ id: result.lastInsertRowid, task })
})

// UPDATE a todo
router.put('/:id', (req, res) => {
    const { task } = req.body
    const { id } = req.params

    const updateTodo = db.prepare(`
        UPDATE todos SET task = ? WHERE id = ? AND user_id = ?
    `)

    updateTodo.run(task, id, req.userId)

    res.json({ message: "Todo updated" })
})

// DELETE a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params

    const deleteTodo = db.prepare(`
        DELETE FROM todos WHERE id = ? AND user_id = ?
    `)

    deleteTodo.run(id, req.userId)

    res.json({ message: "Todo deleted" })
})

export default router
