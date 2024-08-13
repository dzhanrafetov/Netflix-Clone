"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
async function signup(req, res) {
    res.send("Sign up route");
}
async function login(req, res) {
    res.send("Login route");
}
async function logout(req, res) {
    res.send("Logout");
}
