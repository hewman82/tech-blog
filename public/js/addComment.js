const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-input').value.trim();
    // Get comment value
  
    if (content) {
      const date = new Date();
      const created_on = date.toLocaleDateString();
      // Save current date
      const url = document.URL;
      const post_id = url.substring(url.lastIndexOf('/') + 1);
      // Get post id from url

      const response = await fetch('/api/comments', {
        // Send post request with value, date, and post id
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