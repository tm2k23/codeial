console.log('home post comment javascript file loaded');

class PostComments {
    constructor(postId) {
        this.createComment(postId)
    }

    createComment(postId) {
        let postThis = this;
        let commentForm = $('#' + postId + ' .comment-form');
        // console.log(commentForm);
        commentForm.submit(function(e) {
            let eventThis = this;
            e.preventDefault();
            // console.log(commentForm.serialize());
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: commentForm.serialize(),
                success: function(data) {
                    // console.log('comment added successfully to the database ', data);
                    $('#' + postId + ' .comment-container').prepend(postThis.newCommentDom(data.data.comment));
                    // console.log(postThis.newCommentDom(data.data.comment));
                },
                error: function(error) {
                    console.log(error);
                }

            })
        })
    }

    newCommentDom(comment) {
        // console.log(comment);
        return $(`
            <li id="${comment._id}">
                    <a href="/comment/destroy/${comment._id}">x</a>
                
                    ${comment.content}
                        <br>
                    ${comment.user.name}
            </li>
        `);
    }

}