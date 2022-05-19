import Swal from 'sweetalert2';

const fire = (message, status = 'error') =>
  Swal.fire({
    position: 'top-end',
    icon: status,
    title: message,
    showConfirmButton: true,
    timer: 2000,
  });

export default fire;
