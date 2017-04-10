/**
 * Created by airing on 2017/4/10.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            'username': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'password': {
                'type': DataTypes.STRING(125),
                'allowNull': false
            }
        }
    );
}
