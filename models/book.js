/**
 * Created by airing on 2017/4/14.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'book',
        {
            'book_title': {
                'type': DataTypes.STRING(125),
                'allowNull': false
            },
            'book_author': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            },
            'book_key': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'book_content': {
                'type': DataTypes.TEXT,
                'allowNull': true
            },
            'book_cover': {
                'type': DataTypes.STRING(125),
                'allowNull': false
            },
            'book_last_number': {
                'type': DataTypes.INTEGER,
                'allowNull': true
            },
            'book_publish': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            },
            'book_rate': {
                'type': DataTypes.DOUBLE,
                'allowNull': false
            },
            'book_place': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            }
        }
    );
}
