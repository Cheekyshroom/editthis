export default {
  get: (url) => {
    return window.fetch(url).then(r => r.json());
  },
  post: (url, body) => {
    return window.fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body
    }).then(r => r && r.json());
  }
};
