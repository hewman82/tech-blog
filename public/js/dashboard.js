const deleteBtns = document.getElementsByClassName('delete-btn');
// Save array of all delete buttons
const editBtns = document.getElementsByClassName('edit-btn');
// Save array of all edit buttons

const postFormHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim();
  const post = document.querySelector('#post-post').value.trim();
  // Get input values
  
  if (title && post) {
    const date = new Date();
    const created_on = date.toLocaleDateString();
    // Get current date

    const response = await fetch('/api/posts', {
      // Send post request with date and input values
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

const deletePost = async (e) => {
  const id = (e.target.parentNode.id);
  // Get post id from div id
  const confirm = window.confirm('Delete post?');
  if(confirm) {
    const response = await fetch('/api/posts/:id', {
      // Send delete request with post id
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
}

const editPost = async (e) => {
  const parent = e.target.parentNode;
  const id = parent.id;
  // Get post id from div id
  const title = parent.children[0].children[0].textContent;
  const postBody = parent.children[1].textContent;
  // Save post values
  parent.innerHTML = `<div class="col-md-12 p-5">
  <h2>Edit Post</h2>
  <form class="form update-form">
  <div class="form-group">
      <label for="post-title">Title:</label>
      <input class="form-input" type="text" id="update-title" value="${title}" />
  </div>
  <div class="form-group">
      <label for="post-post">Post:</label>
      <input class="form-input" type="text" id="update-body" value="${postBody}" />
  </div>
  <div class="form-group">
      <button class="btn btn-custom update-btn" type="submit">Submit</button>
      <button class="btn delete-btn">Cancel</button>
  </div>
  </form>
</div>`;
  // Replace post div with form prefilled with post values
  parent.addEventListener('submit', async function(e) {
      e.preventDefault();
      const updTitle = e.target.children[0].children[1].value;
      const updBody = e.target.children[1].children[1].value;
      // Get edited post values
      const response = await fetch('/api/posts/:id', {
        // Send put request with post id and updated values
        method: 'PUT',
        body: JSON.stringify({ id, updTitle, updBody }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update post');
      }
  });
}
  
document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', deletePost);
}
// Add event listener to all delete buttons

for(let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener('click', editPost);
}
// Add event listener to all edit buttons