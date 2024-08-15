document.addEventListener('DOMContentLoaded', function () {
    const myForm = document.getElementById('myForm');
    myForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        const name = myForm.querySelector('[name="name"]').value;
        const email = myForm.querySelector('[name="email"]').value;
        const subject = myForm.querySelector('[name="subject"]').value;
        const message = myForm.querySelector('[name="message"]').value;

        if (!name || !email || !subject || !message) {
            // Si algún campo está vacío, muestra un mensaje de error
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos del formulario.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-confirm-button-error'
                }
            });
        } else {
            // Si todos los campos están llenos, muestra un mensaje de éxito
            Swal.fire({
                imageUrl: "img/logo.png",
                title: '¡Enviado!',
                text: 'Te contactaremos a la brevedad',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'swal-title-success',
                    text: 'swal-text-success'
                }
            }).then(() => {
                // Después de hacer clic en OK, envía el formulario y luego reinícialo
                fetch(myForm.action, {
                    method: 'POST',
                    body: new FormData(myForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        // El formulario se envió correctamente
                        myForm.reset();
                    } else {
                        // Hubo un error al enviar el formulario
                        throw new Error('Error al enviar el formulario');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            });
        }
    });
});