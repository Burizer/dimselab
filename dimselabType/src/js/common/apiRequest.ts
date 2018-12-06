const fetchOptions = (type: string, body: any = {}) => {
  const options = {
    method: type,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'Application/json'
    }
  }

  return options
}


export const getRequest = (apiUrl: string, config: object = {}) => {
  return fetch(apiUrl, config)
    .then(res => res.json())
}

export const postRequest = (apiUrl: string, body: object) => {
  return fetch(apiUrl, Object.assign({}, fetchOptions('POST', body)))
    .then(res => res.json())
}

export const putRequest = (apiUrl: string, body: object) => {
  return fetch(apiUrl, Object.assign({}, fetchOptions('PUT', body)))
}