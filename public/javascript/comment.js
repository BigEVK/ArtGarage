
async function commentFormHandler(event) {
    event.preventDefault();
    console.log('hello')
    const comment_text = document.querySelector('textarea[name="comment-text"]').value.trim();
    // const post_id = window.location.toString().split('/')[
    //   window.location.toString().split('/').length - 1
    // ];
    const post_id = 1
    console.log(comment_text)
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }

  // window.addEventListener('load', async (event) => {
  //   const post_id = window.location.toString().split('/')[
  //     window.location.toString().split('/').length - 1
  //   ];
  //   if (post_id){
  //     const response = await fetch('/api/comments', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         posy_id,
  //         comment_text
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.ok) {
  //       document.location.reload();
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  // });
  
  
  document.querySelector('.submit-comment').addEventListener('click', commentFormHandler);