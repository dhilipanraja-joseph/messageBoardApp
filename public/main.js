$(()=>{
  // createPostBox();
  $('#postMess').submit(newPost);
  $('.postDelete').on('click',removePost);
  $('.postModify').on('click',modifyPost);

});

function removePost(){
  var id = $(this).closest('div').attr('data-id');
  // console.log(id);
  $.ajax({
    type: "DELETE",
    url: `/post/${id}`,
    success: function (r) {
      // console.log(r);
    }
  });
}

function modifyPost(){
  var message = {"message":prompt("Enter New msg")};
  var id = $(this).closest('div').attr('data-id');
  $.ajax({
    type: "PUT",
    url: `/post/${id}`,
    processData : false,
    contentType: 'application/json',
    data: JSON.stringify(message),
    success: function (r) {
      // console.log(r);
    }
  });
}

// function resetPosts(){
//
//   $.getJSON('data.json',(data)=> {
//     var posts = data;
//     console.log(posts);
//   });
//
// }

function createPostBox() {

  $.get('/showPost').done(posts => {

    let $postBoxes = posts.map(post =>{

      let $postBox = $('#template').clone();
      $postBox.removeAttr('id').removeClass('hidden').addClass();
      $postBox.find('.postBody').text(post.message);
      $postBox.find('.date').text(post.posted_on);
      $postBox.find('.modi').text(post.modified_on);

      return $postBox;
    });

    $('#postViewer').empty().append($postBoxes);
  });

}

function newPost(e){
  e.preventDefault();
  var message = {"message" : $('#inputPost').val()};
  $.ajax({
    type: "POST",
    url: "/createPost",
    processData : false,
    contentType: 'application/json',
    data: JSON.stringify(message),
    success: function (r) {
      console.log(r);
    }
  });
  // console.log(message);
}
