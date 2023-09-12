import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"; 
import { UserContext } from "../../context/user.context";
import './sign-in-form.styles.scss'


const defaultFields = {
    email:'',
    password:''
}

const SignInForm = ()=>{
    const [signInFields,setSignInFields] = useState(defaultFields);
    const {email,password} = signInFields;



    const changeHandler = (event) =>{
        const {name,value} = event.target;

        setSignInFields({...signInFields,[name]:value});

        //console.log(`${email} and ${password}`);
    }
        const resetFormFields = () => {
        setSignInFields(defaultFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email,password);

            
            resetFormFields();
        }catch(error){

            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password for email");
                break;

                case "auth/user-not-found":
                    alert("account not found");
                break;  
                default:
                    console.log("error occured while signing in",error.message)
            }

            
        }
    }
    
    const signInWithGoogle = async () =>{
         await signInWithGooglePopup();


    }
    return(
            <div className="sign-up-container">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        label="email"
                        inputOptions={{
                            required:true,
                            type:'email',
                            onChange:changeHandler,
                            name:'email',
                            value:email
                            
                        }}

                    />
                    <FormInput 
                        label='password'
                        inputOptions={{
                            required:true,
                            type:'password',
                            onChange:changeHandler,
                            name:'password',
                            value:password
                        }}
                    />
                    <div className="buttons-container">
                        <Button type="submit" onClick={handleSubmit}>SIGN IN</Button>
                    
                        <Button type="button" buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                    </div>
                </form>
            </div>
    )
}

export default SignInForm;