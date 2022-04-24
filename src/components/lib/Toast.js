import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

const babeng = (title = 'Info !', description = '') => {
  createToast(
    {
      title,
      description,
    },
    {
      type: 'default',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const warning = (title = 'Info !', description = '') => {
  createToast(
    {
      title,
      description,
    },
    {
      type: 'warning',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const danger = (title = 'Info !', description = '') => {
  createToast(
    {
      title,
      description,
    },
    {
      type: 'danger',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const success = (title = 'Info !', description = '') => {
  createToast(
    {
      title,
      description,
    },
    {
      type: 'success',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const Toast = {
  babeng,
  warning,
  success,
  danger,
};
export default Toast;
