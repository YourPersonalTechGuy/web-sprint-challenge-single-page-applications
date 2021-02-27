import * as init from "yup"

const pizzaSchema = init.object().shape({
    fname: init.string()
        .trim()
        .required("First Name is a required field")
        .min(2, "Minimum 2 characters for First Name"),
    
    lname: init.string()
        .trim()
        .required("Last Name is a required field")
        .min(2, "Minimum 2 characters for Last Name"),

    pizzaSize: init.string()
        .required("Please select a pizza size")
        .oneOf(["Personal","Small", "Medium", "Large", "Extra Large"], "Please select a pizza size"),

    specialInstructions: init.string(),
})

export default pizzaSchema;

