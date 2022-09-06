const User = require('./User');
const Blog = require('./Post');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

Blog.belongsTo(User, {
  foreignKey: 'user_id'
})

Blog.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

Comment.belongsTo(Blog, {
  foreignKey: 'post_id'
})


module.exports = {
  User,
  Blog,
  Comment
};