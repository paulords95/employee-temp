const getEmployees = async () => {
  try {
    const response = await fetch(
      "http://192.168.0.11:5555/employees/get-employees"
    );

    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    return error;
  }
};

export default getEmployees;
