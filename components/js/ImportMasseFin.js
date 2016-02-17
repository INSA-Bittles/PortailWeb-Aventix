
function testJson(){

	 $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'XSLS'
        })
}