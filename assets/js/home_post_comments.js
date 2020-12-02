console.log('home post comment javascript file loaded');

class PostComments {
    constructor(postId) {
        this.createComment(postId);
        let commentDeletLinks = $(`#${postId} .comment-delete-button`);
        // console.log(commentDeletLinks);
        for (let commentDeletLink of commentDeletLinks) {
            // console.log(commentDeletLink);
            this.deleteComment(commentDeletLink);
        }
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
                    let commentDom = postThis.newCommentDom(data.data.comment);
                    console.log(commentDom);
                    $('#' + postId + ' .comment-container').prepend(commentDom);
                    showNoty('Comment Added Successfully');
                    // console.log(postThis.newCommentDom(data.data.comment));
                    // postThis.deleteComment(postId);
                    postThis.deleteComment($('.comment-delete-button', commentDom));
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
                    <a class="comment-delete-button" href="/comment/destroy/${comment._id}">x</a>
                
                    ${comment.content}
                        <br>
                    ${comment.user.name}
            </li>
        `);
    }


    deleteComment(deleteLink) {
        // console.log(deleteLink);

        $(deleteLink).click(function(event) {
            event.preventDefault();
            // console.log($(deleteLink)[0].getAttribute('href'));
            // console.log('default behaviour preveneted');
            $.ajax({
                type: 'get',
                url: $(deleteLink)[0].getAttribute('href'), // or $(deleteLink).prop('href');
                success: function(data) {
                    $(`#${data.data.comment_id}`).remove();
                    showNoty('Comment Deleted Successfully');
                    // console.log(data);
                }
            })
        })
    }
}