
// users.js

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.role').forEach(function (button) {
        button.addEventListener('click', function () {
            const userId = button.getAttribute('data-user-id');
            Swal.fire({
                title: "Cambiar rol de usuario",
                text: "¿Está seguro que quiere cambiar el rol del usuario?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, cambiar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`http://localhost:8080/api/users/premium/${userId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.ok) {
                            Swal.fire({
                                title: "Cambio de Rol",
                                text: "El rol de usuario a cambiado",
                                icon: "success"
                            }).then(() => {
                                window.location.href = "http://localhost:8080/adminusers"})
                        }
                        else if(response.status === 403) {
                            Swal.fire({
                                title: "No fue posible el cambio de rol",
                                text: "El usuario no presentó la documentación requerida para ser premium",
                                icon: "error"
                            });
                        }
                        else if(response.status === 405) {
                            Swal.fire({
                                title: "No fue posible el cambio de rol",
                                text: "No se puede cambiar el rol de los administradores",
                                icon: "error"
                            });
                        }
                        else{
                            Swal.fire({
                                title: "No fue posible el cambio de rol",
                                text: "Ocurrió un error al intentar cambiar el rol del usuario",
                                icon: "error"
                            })
                        }
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            })
            });;
    });
});

document.querySelectorAll('.delete').forEach(function (button) {
    button.addEventListener('click', function () {
        const userId = button.getAttribute('data-user-id');
        Swal.fire({
            title: "Eliminar usuario",
            text: "¿Está seguro que quiere eliminar al usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        Swal.fire({
                            title: "Usuario eliminado",
                            text: "El usuario ha sido eliminado",
                            icon: "success"
                        }).then(() => {
                            window.location.href = "http://localhost:8080/adminusers"})
                    }
                    else if(response.status === 403) {
                        Swal.fire({
                            title: "No fue posible eliminar el usuario",
                            text: "El usuario no se pudo eliminar, recuerde que no se pueden eliminar a los administradores",
                            icon: "error"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "No fue posible eliminar el usuario",
                            text: "Ocurrió un error al intentar eliminar el usuario",
                            icon: "error"
                        })
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }
        })
        });;
    });


