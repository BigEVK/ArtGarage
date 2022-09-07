const User = require('./User');
const Blog = require('./Post');
const Comment = require('./Comment');
const Profile = require('./Profile');

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

Profile.belongsTo(User, {
  foreignKey: 'profile_id',
  onDelete: 'CASCADE'
})


module.exports = {
  User,
  Blog,
  Comment,
  Profile
};