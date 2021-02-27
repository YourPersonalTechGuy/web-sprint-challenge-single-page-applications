import React from "react";
import {Link} from "react-router-dom"

export default function PizzaForm(props) {

    const {
        values,
        error,
        isDisabled,
        submit,
        change,
    } = props

    const submission = (event) => {
        event.preventDefault();
        submit();
        
    }

    const onChange = (event) => {
        const { name, value, type, checked , id} = event.target
        const usedValue = type === "checkbox" ? checked : value
        change(name, usedValue, id)
    }

    return (

        <form className="PizzaForm-Container" onSubmit={submission}>
            <div className="input-container">
                
                <div className="errors">{error.fname}</div>
                <label>First Name: 
                    <input 
                        type="text"
                        name="fname"
                        onChange={onChange}
                        value={values.fname}
                    />
                </label>

                <div className="errors">{error.lname}</div>
                <label>Last Name: 
                    <input 
                        type="text"
                        name="lname"
                        onChange={onChange}
                        value={values.lname}
                    />
                </label>

                <div className="errors">{error.pizzaSize}</div>
                <label>Pizza Size: 
                    <select name="pizzaSize" onChange={onChange} value={values.pizzaSize}>
                        <option value="">---Pizza Size---</option>
                        <option value="Personal">Personal</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Extra Large">Extra Large</option>
                    </select>
                </label>

                <div className="errors">{error.totalActiveToppings}</div>
                <div>Toppings: <br />
                    {values.toppings.map((topping, index) => {
                        return(
                            <label>
                                <input
                                    id={index}
                                    type="checkbox"
                                    name={topping.name}
                                    onChange={onChange}
                                    checked={topping.active}
                                />{topping.name}
                            </label>
                        )
                    })}
                </div>

                <label>Special Instructions
                    <input 
                        type="text"
                        name="specialInstructions"
                        onChange={onChange}
                        value={values.specialInstructions}
                    />
                </label>
            </div>

            <Link to="/pizza/confirmation">
                <button disabled={isDisabled} id="submit" onClick={submission}>Place order</button>
            </Link>

        </form>

    )
}