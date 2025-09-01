let index = [];

// Load search index from search.json
fetch('search.json')
  .then(response => response.json())
  .then(data => index = data)
  .catch(err => console.error("Error loading search.json:", err));

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault(); // stop page reload
  const query = document.getElementById('searchBox').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if(query.length < 2) {
    resultsDiv.innerHTML = "<p>Please type at least 2 characters.</p>";
    return;
  }

  const results = index.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  if(results.length === 0){
    resultsDiv.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach(r => {
      resultsDiv.innerHTML += `
        <div class="result">
          <a href="${r.url}">${r.title}</a>
          <div class="snippet">${r.content.substring(0,120)}...</div>
        </div>
      `;
    });
  }
});
