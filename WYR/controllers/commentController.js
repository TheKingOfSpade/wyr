const {Comment, Reply} = require('../models')

module.exports.createComment = async function(req, res){
    let choiceId = req.params.choiceId;
    await Comment.create({
        author_name: req.body.author_name,
        body: req.body.body,
        commented_on: new Date,
        choice_id: choiceId
    });
    res.redirect(`/choice/${choiceId}`);
}

module.exports.addReply = async function(req, res){
    const parentComment = await Comment.findByPk(req.params.commentId);
    let choiceId = parentComment.choice_id;
    await Reply.create({
        author_name: req.body.author_name,
        body: req.body.body,
        commented_on: new Date,
        choice_id: choiceId,
        parent_comment_id:parentComment.id
    });
    res.redirect(`/choice/${choiceId}`)
}

module.exports.deleteComment = async function(req, res) {
    const comment = await Comment.findByPk(req.params.commentId);
    await Comment.update({
            is_deleted: true
        }, {
            where: {
                id: req.params.commentId
            }
        }
    );
    res.redirect(`/choice/${comment.choice_id}`);
};

module.exports.deleteReply = async function(req, res) {
    const reply = await Reply.findByPk(req.params.replyId);
    await Reply.update({
            is_deleted: true
        }, {
            where: {
                id: req.params.replyId
            }
        }
    );
    res.redirect(`/choice/${reply.choice_id}`);
};

