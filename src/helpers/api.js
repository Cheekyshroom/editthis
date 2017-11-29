export default {
  get: (url) => {
    return window.fetch(url).then(r => r.json());
  },
  post: (url, body) => {
    return window.fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(r => r && r.json());
  }
};
