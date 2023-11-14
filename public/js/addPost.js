const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (title && body) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Post added');
      } else {
        alert('Failed to add post');
      }
    }
  };
  
  document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);