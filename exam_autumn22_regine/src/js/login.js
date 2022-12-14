import { apiUrl } from '../modules/urls.js';
import { homeLoggedIn } from "../modules/homepage.js";
const loginEndpoint = "api/v1/auction/auth/login";

const getEmail = document.querySelector("#exampleFormControlInput1");
const getPassword = document.querySelector("#exampleFormControlInput2");
const loginBtn = document.querySelector("#loginBtn");
const loginContent = document.querySelector("#login-content");


export async function loginUser(url, endpoint, userData) {
    try {
        console.log(url, endpoint, userData);
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url + endpoint, postData);
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        const userName = json.name;
        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userName", userName);
        if (response.ok) {
        window.location.href = "../index.html";
        homeLoggedIn()
        } else {
        loginContent.innerHTML = "Password or Email is invalid";
        }
    } catch (error) {
        console.log(error);
    } 
};


loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = getEmail.value.trim();
    const password = getPassword.value.trim();

    const userToLogin = {
        email: email,
        password: password,
    }
    loginUser(apiUrl, loginEndpoint, userToLogin);
});

