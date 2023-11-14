const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post = document.querySelector('#post-post').value.trim();
  
    if (title && post) {
      var created_on = getTime();

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, post, created_on }),
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