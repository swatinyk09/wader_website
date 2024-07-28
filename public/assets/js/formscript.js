document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('/submit', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.text())
      .then(data => {
        alert(data);
        this.reset();
      }).catch(error => {
        console.error('Error:', error);
        alert('Error submitting form');
      });
  });
  