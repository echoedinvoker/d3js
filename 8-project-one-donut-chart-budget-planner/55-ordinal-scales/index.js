const form = document.querySelector('form')
const name = form.querySelector('#name')
const cost = form.querySelector('#cost')
const error = form.querySelector('#error')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (name.value.trim() && parseInt(cost.value) > 0) {

    const item = {
      name: name.value,
      cost: parseInt(cost.value)
    }

    console.log(item)

    db.collection('expenses').add(item).then(res => {
      name.value = ''
      cost.value = ''
      error.textContent = ''
    })

  } else {
    error.textContent = 'Please enter correct name and cost.'
  }
})
