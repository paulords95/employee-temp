const getEmployees = async () => {
  try {
    const response = await fetch(
      "http://localhost:2903/employees/get-employees"
    );

    const parseRes = await response.json();
    return parseRes;
  } catch (error) {
    return error;
  }
};

export default getEmployees;
