const postTitle = document.querySelector('#post-title');
const postPost = document.querySelector('#post-post');

const editFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title').value.trim();
    const post = document.querySelector('#post-post').value.trim();
    // Get post values
    
    if (title && post) {
      const date = new Date();
      const created_on = date.toLocaleDateString();
      // Get current date
  
      const response = await fetch('/api/posts', {
        // Send post request with values and date
        method: 'POST',
        body: JSON.stringify({ title, post, created_on }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add post');
      }
    }
  };