import Customer from '../models/customer.js'
import bcrypt from 'bcrypt';


const accountController = {

  login: function(req, res) {
    Customer.findOne(
      {CUSTOMER_NAME: req.body.username}, 
      '', 
      function(err, customer){
        if(err || !customer) {
          res.sendStatus(401) // Unauthorized
        } else {
          const compare = bcrypt.compareSync(req.body.password, customer.PASSWORD);
          if (compare) return res.sendStatus(200) // OK
          return res.sendStatus(401);
        }
      }
    )
  },

  register: function(req, res) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt)
    Customer.create({ 
      CUSTOMER_NAME: req.body.name, 
      PASSWORD: hashedPass,
      EMAIL: req.body.email
    }).then(
      () => res.sendStatus(201), // OK
      () => res.sendStatus(500) // OK
    )
  }

}

export default accountController