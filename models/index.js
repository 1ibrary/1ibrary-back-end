var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize').sequelize();
var User = sequelize.import('./user');
var Book = sequelize.import('./book');
var List = sequelize.import('./list');
var Detail = sequelize.import('./detail');
var Feedback = sequelize.import('./feedback');

User.hasMany(List, {foreignKey: 'userId', targetKey: 'userId'});
Book.hasMany(Detail, {foreignKey: 'bookId', targetKey: 'bookId'});
User.hasMany(Feedback, {foreignKey: 'userId', targetKey: 'userId'});

List.belongsTo(User);
Detail.belongsTo(Book);
Feedback.belongsTo(User);

sequelize.sync();

exports.User = User;
exports.Book = Book;
exports.List = List;
exports.Detail = Detail;
exports.Feedback = Feedback;
