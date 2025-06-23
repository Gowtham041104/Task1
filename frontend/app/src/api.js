const apiUrl = process.env.REACT_APP_API_URL || '';

fetch(`${apiUrl}/api/products`)
  .then(res => res.json())
  .then(data => console.log(data));
