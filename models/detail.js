/**
 * Created by airing on 2017/4/14.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'detail',
        {
            'bookId': {
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'detail_key': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'detail_place': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'is_borrowed': {
                'type': DataTypes.BOOLEAN,
                'allowNull': false
            }
        },
        {
            indexes: [
                {
                    name: 'book_id',
                    method: 'BTREE',
                    fields: ['bookId']
                }
            ]
        }
    );
}
