const successBody = (data) => {
  return {
    status: 200,
    message: 'Success',
    data,
  }
}

const successMes = (message) => {
  return {
    status: 200,
    message,
  }
}

module.exports = {
  successBody,
  successMes,
}
