const deleteBtns = document.querySelectorAll('.delete-btn')
const updateBtns = document.querySelectorAll('.update-btn')
const updateRecord = document.getElementById('update-record')
const form = document.getElementById('update-form');

deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	fetch('/students/delete', {
    		method: 'DELETE',
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({ id: e.target.dataset.id })
    	})
    	.then(res => res.json())
    	.then(data => {
    		if (data.deleted) {
    			e.target.parentElement.parentElement.remove()
    		}
    	})
    })
})

updateBtns.forEach(btn => {
    btn.addEventListener('click', e => {
    	window.location = `/order/update/${e.target.dataset.id}`
    })
})

form.addEventListener('.submit', e => {
    e.preventDefault()

    let formData = new FormData(form)

    fetch(`/students/update/${e.target.dataset.id}`, {
    	method: 'PUT',
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({ data: Object.fromEntries(formData)})
    })
    .then(res => res.json())
    .then(data => {
    	console.log(data)
    })
})
