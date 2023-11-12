const trash = document.getElementsByClassName("fa-trash")
const update = document.getElementsByClassName("select-status")
const forms = document.getElementsByClassName('remove-default')

Array.from(forms).forEach(function(element) {
  element.addEventListener('click', function(event){
  event.preventDefault()//Default of a form is to get so we are stopping the default behavior
  event.stopPropagation()

  });
});

//line 14 from chat GPT - asked how to add event listeners to items in a drop down menu
document.addEventListener('DOMContentLoaded', (event) => 
  Array.from(update).forEach(function(element){
    element.addEventListener('change', function() {

    const selectedOption = this.value; // Gets the value of the selected option
    const id = this.closest('li').childNodes[13].innerText
    const statusFormPath = this.closest('form').action.includes("/catalog/status")
    const conditionFormPath = this.closest('form').action.includes("/catalog/condition")

      if (statusFormPath){ //if the update is for a status, run the status put fetch
        fetch('/catalog/status', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'id': id,
            'status': selectedOption
        })
          })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          window.location.reload(true)
        })
      } else if (conditionFormPath){ 
          fetch('/catalog/condition', { //if the update is for a condition, run the condition put fetch
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': id,
              'condition': selectedOption
          })
            })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            window.location.reload(true)
          })
      }
  })}));

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.closest('li').childNodes[13].innerText
        fetch('catalog', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'id': id,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
