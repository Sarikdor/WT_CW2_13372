let fs = require('fs')
let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('meals', { meals: getAll('meals') })
})


router.route('/create')
    .get((req, res) => {
        res.render('create-meals', { name: getAll('meals') })
    })
    .post((req, res) => {
        let meals = getAll('meals')

        meals.push({
            id: uniqid(),
            name: req.body.name,
            price: req.body.name,
        })

        saveAll('meals', meals)

        res.redirect('/meals')
    })


router.delete('/delete', (req, res) => {

    let meals = getAll('meals')

    let filteredorder = meals.filter(meal => meal.id != req.body.id)

    saveAll('meals', filteredorder)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let meal = getAll('meals').find(meal => meal.id == id)
        res.render('create-meals', { name: getAll('meals') })
    })
    .put((req, res) => {
        let id = req.params.id

        let meals = getAll('meals')

        let findMeal = meals.find(meal => meal.id == id)

        let idx = meals.indexOf(meal)

        meals[idx].name = req.body.data.name
        meals[idx].price = req.body.data.price
        

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