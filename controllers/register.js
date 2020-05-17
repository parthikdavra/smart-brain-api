
const registerHandler = (req,res,db,bcrypt) => {
    var { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect from submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .returning('email')
            .then(logInEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: logInEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)

    })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports ={
    registerHandler : registerHandler
}