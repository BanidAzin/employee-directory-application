export const getData = ({
  url,
  method = 'POST',
  headers = {},
  body = {},
  checkResponseMode = (res, rej) => {
    if (res.ok) {
      const response = res.json();
      return response;
    }

    rej({
      errors: {
        message: "Couldn't load data, Please try again",
      },
    });
  },
  interceptResponse = (resp, res, rej) => res(resp),
}) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(response => checkResponseMode(response, reject))
      .then(response => interceptResponse(response, resolve, reject))
      .catch(e => reject(e));
  });
