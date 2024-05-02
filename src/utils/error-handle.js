function errorHandle (status, message) {
  switch (status) {
  case 403:
  case 404:
  case 500:
  case 422:
    break
  default:
  }
}

export default errorHandle
