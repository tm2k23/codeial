console.log('home_posts.js Javascript file loaded');

{ // I have used these braces for scope
    let createPost = function() {
        let newPostForm = $('#new-post-form');
        // console.log(newPostForm);
        newPostForm.submit(function(event) {
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    // console.log(data.data.post);
                    $('#post-section').prepend(newPostDom(data.data.post));
                    // console.log(data.data.post._id);
                    new PostComments(data.data.post._id);
                    showNoty('Posted Successfully');
                    deletePost('.post-delete-button', newPostDom(data.data.post));
                },
                error: function(error) { console.log(error.responseText); }
            })
        });

        let newPostDom = function(post) {
            // console.log(post);
            return $(`<div style="border: 2px solid black;" id="${post._id}">
                <a class="post-delete-button" href="/post/destroy/${post._id}">x</a>
            
                ${post.content}
                    <P>
                    ${post.user.name}
                                <form class="comment-form" action="/comment/create" method="POST">
                                    <input type="text" name=content>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Comment">
                                </form>
                                    <ul class="comment-container">
                                    </ul>
                    </P>
                    <br>  
                </div>
                 
            `)
        }
    }

    let deletePost = function(deleteLink) {
        // console.log(deleteLink);
        $(deleteLink).click(function(event) {
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $('#' + data.data.post_id).remove();
                    showNoty('Post and Associated Comments Deleted Successfully');
                },
                error: function(err) { console.log(err); }
            })
        })
    }

    createPost();

    // add event listers of deletePost to deletebutton of every post
    let addAJAXToAllPosts = function() {
        let allPosts = $('#post-section>div');
        // console.log(allPosts);
        for (post of allPosts) {
            // console.log(post);
            // console.log($('.post-delete-button', post));
            deletePost($('.post-delete-button', post));
            // console.log(post.getAttribute('id'));
            new PostComments(post.getAttribute('id'));
        }
    }();
}