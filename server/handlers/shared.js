export function validateEmailId(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    return regex.test(email);
}

export function validateName(name) {
    const regex = /^[a-zA-Z .]*$/;
    return regex.test(name);
}

export function validatePassword(password) {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
}

export function checkRegisterValidations(name, email, password) {
    if (name && name !== "") {
        if (!validateName(name)) {
            return { success: false, error: "Please provide valid name." };
        }
    } else {
        return { success: false, error: "Please provide your name." };
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
    return { success: true, error: "" };
}
