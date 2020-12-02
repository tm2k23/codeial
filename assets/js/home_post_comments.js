console.log('home post comment javascript file loaded');

class PostComments {
    constructor(postId) {
        this.createComment(postId)
    }
    createComment(postId) {
        let commentForm = $('#' + postId + ' .comment-form');
        console.log(commentForm);
        commentForm.submit(function(e) {
            e.preventDefault();
            // console.log(commentForm.serialize());
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: commentForm.serialize(),
                success: function(data) {
                    console.log('comment added successfully to the database ', data);
                },
                error: function(error) {
                    console.log(error);
                }

            })
        })
    }
}