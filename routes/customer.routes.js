let fs = require('fs')
let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('order', { order: getAll('order') })
})


router.route('/create')
    .get((req, res) => {
        res.render('create-order', { modules: getAll('meals') })
    })
    .post((req, res) => {
        let order = getAll('order')

        order.push({
            id: uniqid(),
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address 
        })

        saveAll('order', order)

        res.redirect('/order')
    })


router.delete('/delete', (req, res) => {

    let order = getAll('order')

    let filteredorder = order.filter(student => student.id != req.body.id)

    saveAll('order', filteredorder)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let student = getAll('order').find(student => student.id == id)
        res.render('create-order', { student: student, modules: getAll('meals') })
    })
    .put((req, res) => {
        let id = req.params.id

        let order = getAll('order')

        let student = order.find(student => student.id == id)

        let idx = order.indexOf(student)

        order[idx].name = req.body.data.name
        order[idx].phone = req.body.data.phone
        order[idx].meal = req.body.data.meal

        saveAll('order', order)

        res.json({ updated: true })
    })

module.exports = router
function getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}