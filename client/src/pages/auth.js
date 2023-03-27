import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return (
    <div className = "auth">
        <Login/>
        <Register/>
    </div>
    )
}

//creating Login component
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const[_, setCookies ]= useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {username, password,})
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    return <Form 
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={setPassword} 
    label = "Login"
    onSubmit = {onSubmit}/>
}

//creating Register component
const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
//axios request
    const onSubmit = async (event) =>{
        event.preventDefault()
        try {
            await axios.post("http://localhost:3000/auth/register", {username, password})
            alert ("Registration Completed! Now Login")
        } catch(err){}
    }
    return <Form 
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={setPassword} 
    label= "Register"
    onSubmit= {onSubmit} />
}
// form is used in multiple places so making it a function will make the code dryer
const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return (
        <div className="auth-containter">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" 
                    id="username"
                    value = {username} 
                    onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" 
                    id="password"
                    value = {password} 
                    onChange={(event) => setPassword(event.target.value) }/>
                </div>
                <button type= "submit">{label}</button>
            </form>
        </div>
    )
}