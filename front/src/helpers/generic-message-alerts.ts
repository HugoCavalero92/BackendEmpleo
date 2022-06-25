import Swal from "sweetalert2";

export const errorAlert = ( message: string) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Algo salio mal!'
      });
}

export const successAlert = (title: string) => {

    Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
      });
}