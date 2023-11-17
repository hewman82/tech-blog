const postTitle = document.querySelector('#post-title');
const postPost = document.querySelector('#post-post');

const editFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title').value.trim();
    const post = document.querySelector('#post-post').value.trim();
    
    if (title && post) {
      const date = new Date();
      const created_on = date.toLocaleDateString();
  
      const response = await fetch('/api/posts', {
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