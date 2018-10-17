// Modify link to reflect latest CSV file
var createLink = function(url) {
  var link = document.getElementById('download');
  link.setAttribute('href', url);
  link.textContent = 'Download latest CSV file';
};

// Use fetch to make the POST request
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('csvForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    fetch('csv', {
      method: 'POST',
      mode: 'cors',
      body: data
    }).then(response => response.json())
    .then(response => {
      if (response.result) {
        createLink(response.result)
      }
    });
  });
});
