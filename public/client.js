document.addEventListener('DOMContentLoaded', function () {
    let errorMessageElem = document.querySelector('.error');
    let successMessage = document.querySelector('.success');
    let messageOut = document.querySelector('.output');


    console.log()
    if (errorMessageElem.innerHTML !== '')  {

        setTimeout(function () {
            
            errorMessageElem.innerHTML = '';
            // messageOut.innerHTML = '';

        }, 2000);
    }
});