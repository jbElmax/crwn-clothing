import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}



const SignUpForm = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    console.log(formFields);

    const handleChange = (event)=>{
        const {name,value} = event.target;

        setFormFields({...formFields,[name]:value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleFormSubmit =async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
                );
            
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already exist.');
            }
            console.log("unable to create a user",error.message)
        }
        
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleFormSubmit}>

                <FormInput
                    label="Display Name"
                    inputOptions = {{
                        type:"text",
                        onChange:handleChange,
                        name:"displayName",
                        value:displayName,
                        required:true
                    }}/>

                <FormInput 
                    label="Email" 
                    inputOptions={{
                        type:"email", 
                        onChange:handleChange, 
                        name:"email", 
                        value:email,
                        required:true
                    }}
                
                />
        
                <FormInput 
                    label = "Password"
                    inputOptions={{
                        type:"password", 
                        onChange:handleChange, 
                        name:"password", 
                        value:password, 
                        required:true
                    }}
                
                />

                <FormInput 
                    label="Confirm Password" 
                    inputOptions={{
                        type:"password", 
                        onChange:handleChange, 
                        name:"confirmPassword", 
                        value:confirmPassword,
                        required:true
                    }}
                
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;