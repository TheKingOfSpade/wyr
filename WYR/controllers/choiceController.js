const {Choices, Comment, Reply} = require('../models');

module.exports.renderAddForm = function(req, res){
    const choice = {
        choice_1: '',
        choice_2: ''
    };
    res.render('choices/add', {choice});
};

module.exports.addChoice = async function(req, res){
    const choice = await Choices.create({
        choice_1: req.body.choice_1,
        choice_2: req.body.choice_2,
        author_id: req.user.id,
        published_on: new Date()
    });
    res.redirect('/')
}

module.exports.displayChoice = async function(req, res){
    const choice = await Choices.findByPk(req.params.choiceId, {
        include: [
            'author',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [{
                    model: Reply,
                    as: 'replies',
                    required: false
                }]
            }
        ],
        order: [
            ['comments', 'commented_on', 'desc']
        ]
    });
    res.render('choices/view', {choice});
};

module.exports.displayAll = async function(req, res){
    const choices = await Choices.findAll({
        include: ['author']
    });
    res.render('choices/viewAll', {choices});
}

module.exports.renderEditForm = async function(req, res){
    const choice = await Choices.findByPk(req.params.choiceId);
    if (!choice.isOwnedBy(user)){
        res.redirect('/');
        return;
    }
    res.render('choices/edit', {choice});
};

module.exports.updateChoice = async function(req, res){
    if (!choice.isOwnedBy('admin')){
        res.redirect('/');
        return;
    }
    await Choices.update({
        choice_1: req.body.choice_1,
        choice_2: req.body.choice_2,
    }, {
        where: {
            id: req.params.choiceId
        }
    });
    res.redirect(`/choice/${req.params.choiceId}`);
}

module.exports.deleteChoice = async function(req, res){
    const choice = await Choices.findByPk(req.params.choiceId);
    if (!user.is('admin') && !choice.isOwnedBy('author')){
        res.redirect('/');
        return;
    }
    await Choices.destroy({
        where: {
            id: req.params.choiceId
        }
    });
    res.redirect('/')
}