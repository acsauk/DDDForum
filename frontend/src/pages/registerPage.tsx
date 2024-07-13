import React from "react"
import { Layout } from "../components/layout"
import { EmailInput } from "../components/emailInput"
import { TextInput } from "../components/textInput"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
    return (
        <Layout>
            <form method="post">
                <fieldset>
                    <legend className="legend">Create account</legend>

                    <EmailInput></EmailInput>
                    <TextInput fieldName="user-name" placeHolder="Username" />
                    <TextInput fieldName="first-name" placeHolder="First name" />
                    <TextInput fieldName="last-name" placeHolder="Last name" />

                    <div className="form-actions">
                        <div>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </div>
                        <button>Submit</button>
                    </div>
                </fieldset>
            </form>




        </Layout>
    )
}