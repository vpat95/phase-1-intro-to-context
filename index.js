// Your code here

function createEmployeeRecord(employeeArr) {
  return {
    firstName: employeeArr[0],
    familyName: employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesArr) {
  return employeesArr.map((arr) => createEmployeeRecord(arr));
}

function createTimeInEvent(employeeObj, startStamp) {
  const timeInEventsArr = startStamp.split(" ");
  const timeInEventsObj = {
    type: "TimeIn",
    hour: parseInt(`${timeInEventsArr[1]}`, 10),
    date: timeInEventsArr[0],
  };

  employeeObj.timeInEvents.push(timeInEventsObj);
  return employeeObj;
}

function createTimeOutEvent(employeeObj, endStamp) {
  const timeOutEventsArr = endStamp.split(" ");
  const timeOutEventsObj = {
    type: "TimeOut",
    hour: parseInt(`${timeOutEventsArr[1]}`, 10),
    date: timeOutEventsArr[0],
  };

  employeeObj.timeOutEvents.push(timeOutEventsObj);
  return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
  const timeIn = employeeObj.timeInEvents.find((obj) => obj.date === date);
  const timeOut = employeeObj.timeOutEvents.find((obj) => obj.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeObj, date) {
  return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
  return employeeObj.timeInEvents.reduce((accum, current) => {
    let total = wagesEarnedOnDate(employeeObj, current.date);
    return (accum += total);
  }, 0);
}

function calculatePayroll(employeeArr) {
  return employeeArr.reduce((accum, current) => {
    let total = allWagesFor(current, current.date);
    return (accum += total);
  }, 0);
}
