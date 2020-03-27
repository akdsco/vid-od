const express = require('express');
const router = express.Router();
const {validate, Customer} = require('../modules/customers');

// read all customers
router.get('/',async (req, res) => {
  const customer = await Customer.find().sort('name');
  res.send(customer);
});

// create new customer
router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();

  res.send(customer);
});

// read one customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Customer with the given ID was not found.');

  res.send(customer);
});

// update customer
router.put('/:id', async (req, res) =>{
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold || false
    }, {new: true});
  if (!customer) return res.status(404).send('Customer with the given ID was not found.');

  res.send(customer);
});

// delete customers
router.delete('/:id',async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('Customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;