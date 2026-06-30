async function check() {
  try {
    const res = await fetch('http://localhost:1337/api/learning-hubs?filters[slug][$eq]=learning-hub-artile-title&populate=*');
    const data = await res.json();
    console.log('NEW DETAIL QUERY RESPONSE STRUCTURE:');
    if (data && data.data && data.data.length > 0) {
      const first = data.data[0];
      console.log('ID:', first.id);
      console.log('Attributes keys:', Object.keys(first.attributes || first));
      console.log('Content field value type:', typeof (first.attributes || first).Content, 'Is Array:', Array.isArray((first.attributes || first).Content));
      if ((first.attributes || first).Content) {
        console.log('Content blocks (first 2):', JSON.stringify((first.attributes || first).Content.slice(0, 2), null, 2));
      }
    } else {
      console.log('No data returned:', JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('Error fetching from Strapi:', e.message);
  }
}

check();
