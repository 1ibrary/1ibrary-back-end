/**
 * Created by airing on 2017/4/14.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'list',
        {
            'userId': {
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'list_name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'list_content': {
                'type': DataTypes.TEXT,
                'allowNull': true
            },
            'book_list': {
                'type': DataTypes.TEXT,
                'allowNull': true
            }
        },
        {
            indexes: [
                {
                    name: 'user_id',
                    method: 'BTREE',
                    fields: ['userId']
                }
            ]
        }
    );
}
