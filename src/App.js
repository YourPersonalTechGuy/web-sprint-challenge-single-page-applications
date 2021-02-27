import React, {useState, useEffect} from "react";
import {Route, Link, Switch} from "react-router-dom";
import * as init from "yup";
import pizzaSchema from "./validation/pizzaFormSchema"
import PizzaForm from "./components/PizzaForm"



let initialPizza = {
  fname: "",
  lname: "",
  pizzaSize: "",
  toppings: [
    {name: "pepperoni", active: false},
    {name: "cheese", active: false},
    {name: "sausage", active: false},
    {name: "jalapenos", active: false},
    {name: "canadian bacon", active: false},
    {name: "onions", active: false},
    {name: "olives", active: false},
    {name: "pineapples", active: false},
    {name: "scorpion peppers", active: false},
  ],
  specialInstructions: "",
}

let theToppings = ["pepperoni", "cheese", "sausage", "jalapenos", "canadian bacon", "onions", "olives", "pineapples", "scorpion peppers"];

let initialPizzaError = {
  fname: "",
  lname: "",
  pizzaSize: "",
  totalActiveToppings: "",
}

let initialDisabled = true
let initialTotalActiveToppings = 0

const App = () => {
  
  const [pizza, setPizza] = useState(initialPizza)
  const [pizzaError, setPizzaError] = useState(initialPizzaError)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [totalActiveToppings, setTotalActiveToppings] = useState(initialTotalActiveToppings)

  function totalToppings(){return pizza.toppings.reduce((total, item) => {
    return item.active === true ? (total+1) : total
  }, 0)}

  const pizzaUpdate = (name, value, id) => {
    if (!theToppings.includes(name)){
      init.reach(pizzaSchema, name)
      .validate(value)
      .then(()=>{
        setPizzaError({...pizzaError, [name]: ""})
      })
      .catch((err)=>{
        setPizzaError({...pizzaError, [name]: err.errors[0]})
      })
      setPizza({...pizza, [name]:value})
    }
    else{
      let pizzaClone = pizza
      let toppingsClone = pizza.toppings
      let toppingClone = pizza.toppings[id]

      toppingClone = {...toppingClone, [Object.keys(toppingClone)[1]]:value}
      toppingsClone[id] = toppingClone
      pizzaClone = {...pizzaClone, "toppings":toppingsClone}
      
      setPizza(pizzaClone)
    }
  }

  const pizzaSubmit = () =>{
    const currentToppings = ()=>{
      let toppingsCopy = pizza.toppings;
      let trueToppings = [];

      toppingsCopy.forEach((item) =>{
        return item.active === true ? trueToppings.push(Object.values(item)[0]) : trueToppings
      })

      return trueToppings;
    }

    const newPizza = {
      fname: pizza.fname,
      lname: pizza.lname,
      pizzaSize: pizza.pizzaSize,
      toppings: currentToppings(),
      specialInstructions: pizza.specialInstructions,
    }

    alert(JSON.stringify(newPizza))
    setPizza({...initialPizza})
  }

  useEffect(()=>{
    setTotalActiveToppings(totalToppings())

    pizzaSchema.isValid(pizza)
      .then((valid)=>{
        (valid && (totalActiveToppings > 0)) ? setDisabled(!valid) : setDisabled(true)   
      })
  },[pizza, totalActiveToppings])


  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div className="nav-item-container">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-item-container">
          <Link to="#">Help</Link>
        </div>
      </nav>

      <Switch>
        <Route path="/pizza/confirmation">
          <h2>Thank you for ordering with LambdaEats</h2>
        </Route>
        <Route path="/pizza/">
          <PizzaForm 
            values={pizza}
            error={pizzaError}
            isDisabled={disabled}
            submit={pizzaSubmit}
            change={pizzaUpdate}
          />
        </Route>
        <Route exact path="/">
          <div className="pizza-container">
            <h2>Long night coding? Get some pizza! Feed your mind and your appetite.</h2>
            <div className="pizza-button-container">
              <Link to="/pizza/">Pizza?</Link>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
};
export default App;
