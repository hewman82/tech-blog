const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-input').value.trim();
  
    if (content) {
      var date = new Date();
      var created_on = date.toLocaleDateString();
      const url = document.URL;
      const post_id = url.substring(url.lastIndexOf('/') + 1);

      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, created_on, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);