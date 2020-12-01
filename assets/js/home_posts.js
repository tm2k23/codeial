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
                    console.log(data.data.post);
                    $('#post-section').prepend(newPostDom(data.data.post));
                },
                error: function(error) { console.log(error.responseText); }
            })
        });

        let newPostDom = function(post) {
            console.log(post);
            return $(`<div style="border: 2px solid black;" id="${post._id}">
                <a class="post-delete-button" href="/post/destroy/<%=post._id%>">x</a>
            
                ${post.content}
                    <P>
                    ${post.user.name}
                                <form action="/comment/create" method="POST">
                                    <input type="text" name=content>
                                    <input type="hidden" name="post" value=" ${post._id}">
                                    <input type="submit" value="Comment">
                                </form>
                                    <ul>
                                    </ul>
                    </P>
                </div>
                <br>   
            `)
        }
    }




    createPost();
}