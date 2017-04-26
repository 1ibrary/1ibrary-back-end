/**
 * Created by airing on 2017/4/10.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            'user_account': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'user_password': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'user_name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'user_sex': {
                'type': DataTypes.INTEGER,
                'allowNull': true
            }
        }
    );
}
