const validateEmail = (value) => {
  if (!value) {
    return "This field is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  return true;
};

// make generic string | number

const validateData = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 1 characters";
  }
  return true;
};
const validateData2 = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 2) {
    return "This Field must be at least 2 characters";
  }
  return true;
};

const validateDataNumber = (value) => {
  if (!value) {
    return "This field is required";
  }

  if (isNaN(value)) {
    return "This field must be a number";
  }
  return true;
};
const validateDataSkor = (value) => {
  if (!value) {
    return "This field is required";
  }

  if (isNaN(value)) {
    return "This field must be a number";
  }

  if (value > 100) {
    return "This field must be a number less than or equal 100";
  }
  if (value < 0) {
    return "This field must be a number greater than 0";
  }
  return true;
};
const validateDataRupiah = (value) => {
  if (!value) {
    return "This field is required";
  }

  if (isNaN(value)) {
    return "This field must be a number";
  }

  if (value < 0) {
    return "This field must be a number greater than 0";
  }
  return true;
};

const validateSelect = (value) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const fnValidasi = {
  validateEmail,
  validateData,
  validateData2,
  validateDataNumber,
  validateDataSkor,
  validateDataRupiah,
  validateSelect,
};
export default fnValidasi;
