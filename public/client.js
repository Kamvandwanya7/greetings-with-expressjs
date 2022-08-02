document.addEventListener('DOMcontentLoaded', function () {
    let errorMessageElem = document.querySelector('.error');
    let successMessage = document.querySelector('.success');

    if (errorMessageElem.innerHTML !== '' || successMessage !== '') {

        setTimeout(function () {
            errorMessageElem.innerHTML == '';
            successMessage == '';
        }, 3000);
    }
});