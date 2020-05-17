const profileHandler = (req,res,db) =>  {
    var { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json("User is not found")
            }
        })
}

module.exports = {
    profileHandler:profileHandler
}