let fs = require('fs')
let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('meals', { meals: getAll('meals') })
})


router.route('/create')
    .get((req, res) => {
        res.render('create-meals', { modules: getAll('meals') })
    })
    .post((req, res) => {
        let meals = getAll('meals')

        meals.push({
            id: uniqid(),
            name: req.body.name,
            price: req.body.name,
            count: req.body.count
        })

        saveAll('meals', meals)

        res.redirect('/meals')
    })


router.delete('/delete', (req, res) => {

    let meals = getAll('meals')

    let filteredorder = meals.filter(student => student.id != req.body.id)

    saveAll('meals', filteredorder)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let student = getAll('meals').find(student => student.id == id)
        res.render('create-meals', { student: student, modules: getAll('meals') })
    })
    .put((req, res) => {
        let id = req.params.id

        let meals = getAll('meals')

        let student = meals.find(student => student.id == id)

        let idx = meals.indexOf(student)

        meals[idx].name = req.body.data.name
        meals[idx].phone = req.body.data.phone
        meals[idx].meal = req.body.data.meal

        saveAll('meals', meals)

        res.json({ updated: true })
    })

module.exports = router
function getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}