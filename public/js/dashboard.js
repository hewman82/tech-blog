const deleteBtns = document.getElementsByClassName('delete-btn');

const postFormHandler = async (event) => {
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

const deletePost = async (e) => {
  const id = (e.target.parentNode.id);
  console.log(id);
  const confirm = window.confirm('Delete post?');
  if(confirm) {
    const response = await fetch('/api/posts/:id', {
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
  
document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);

document
  .querySelector('.edit-btn')
  .addEventListener('click', function() {
    window.location.replace('/edit');      
  });

document
  .querySelector('.delete-btn')
  .addEventListener('click', deletePost);

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', deletePost);
}