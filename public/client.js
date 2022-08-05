document.addEventListener('DOMContentLoaded', function () {
    let errorMessageElem = document.querySelector('.error');
    let successMessage = document.querySelector('.success');

    console.log()
    if (errorMessageElem.innerHTML !== '' || successMessage !== '') {

        setTimeout(function () {
            
            errorMessageElem.innerHTML = '';
            successMessage = '';
        }, 3000);
    }
});