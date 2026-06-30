async function check() {
  try {
    const res = await fetch('http://localhost:1337/api/learning-hubs?populate=*');
    if (!res.ok) {
      console.log('Error status:', res.status);
      return;
    }
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

check();
