let fs = require('fs')
let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('drinks', { drinks: getAll('drinks') })
})


router.route('/create')
    .get((req, res) => {
        res.render('create-drinks', { modules: getAll('meals') })
    })
    .post((req, res) => {
        let drinks = getAll('drinks')

        drinks.push({
            id: uniqid(),
            name: req.body.name,
            price: req.body.name,
            count: req.body.count
        })

        saveAll('drinks', drinks)

        res.redirect('/drinks')
    })


router.delete('/delete', (req, res) => {

    let drinks = getAll('drinks')

    let filteredorder = drinks.filter(student => student.id != req.body.id)

    saveAll('drinks', filteredorder)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let student = getAll('drinks').find(student => student.id == id)
        res.render('create-drinks', { student: student, modules: getAll('meals') })
    })
    .put((req, res) => {
        let id = req.params.id

        let drinks = getAll('drinks')

        let student = drinks.find(student => student.id == id)

        let idx = drinks.indexOf(student)

        drinks[idx].name = req.body.data.name
        drinks[idx].phone = req.body.data.phone
        drinks[idx].meal = req.body.data.meal

        saveAll('drinks', drinks)

        res.json({ updated: true })
    })

module.exports = router
function getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}