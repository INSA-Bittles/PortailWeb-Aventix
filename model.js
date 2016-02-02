var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'tblUsers',
   idAttribute: 'userId',
});
var aventix = DB.Model.extend({
   tableName: 'users',
   idAttribute: 'id',
});

module.exports.model = aventix;