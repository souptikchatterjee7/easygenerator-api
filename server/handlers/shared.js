import bcrypt from "bcrypt";
import { constants } from "../constants.js";

// check if email is valid or not
export function validateEmailId(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    return regex.test(email);
}

// check if name is valid or not
export function validateName(name) {
    const regex = /^[a-zA-Z .]*$/;
    return regex.test(name);
}

// check if password is valid or not
export function validatePassword(password) {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
}

// check if profile data given for login / register is complete or not
export function checkProfileValidations(
    name,
    isNameNeeded,
    email,
    password,
    device,
    isDeviceNeeded
) {
    // name is not needed for login validation
    if (isNameNeeded) {
        if (name && name !== "") {
            if (!validateName(name)) {
                return { success: false, error: "Please provide valid name." };
            }
        } else {
            return { success: false, error: "Please provide your name." };
        }
    }
    if (email && email !== "") {
        if (!validateEmailId(email)) {
            return { success: false, error: "Please provide valid email." };
        }
    } else {
        return { success: false, error: "Please provide your email." };
    }
    if (password && password !== "") {
        if (!validatePassword(password)) {
            return {
                success: false,
                error: "Please provide valid password."
            };
        }
    } else {
        return { success: false, error: "Please provide your password." };
    }
    // device is not needed for registration validation
    if (isDeviceNeeded) {
        if (!device || device === "") {
            return {
                success: false,
                error: "Please provide your device Id."
            };
        }
    }
    return { success: true, error: "" };
}

// compare user password and encrypted password
export function comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
}

// generate encrypted password from user password
export function generatePassword(password) {
    const salt = bcrypt.genSaltSync(constants.bycryptSaltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
