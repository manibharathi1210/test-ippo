// Login.js

import React, { useState } from "react";
import "../login.css";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import SubArray from "../Utils/SubArray";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState({
    lengthError: false,
    consCharError: false,
    lowerCaseError: false,
    upperCaseError: false,
    numberError: false,
    minSteps: 6
  });

  const checkError = (e) => {
    // Validate password constraints

    // Count number of digits, upper case and lower case characters
    let digits = 0;
    let lowerCase = 0;
    let upperCase = 0;
    // Count of non-overlapping string of consecutive characters of length 3
    let cons = 0;

    const error = { ...passwordError };
    error.minSteps = 0;
    if (e.target.value.length < 6 || e.target.value.length > 20) {
      error.lengthError = true;
    } else {
      error.lengthError = false;
    }

    // Check for maximum consecutive characters using regular expression
    const maxConsecutiveCharacters = 3;
    const consecutiveCharactersRegex = new RegExp(
      `(.)\\1{${maxConsecutiveCharacters - 1},}`
    );
    if (consecutiveCharactersRegex.test(e.target.value)) {
      error.consCharError = true;
    } else {
      error.consCharError = false;
    }

    // keep track of end of a 3 consecutive char string to avoid overlapping
    let prev = -1;

    for (let i = 0; i < e.target.value.length; i++) {
      const ascii = e.target.value.charCodeAt(i);
      if (ascii > 47 && ascii < 58) {
        digits += 1;
      } else if (ascii > 64 && ascii < 91) {
        upperCase += 1;
      } else if (ascii > 96 && ascii < 123) {
        lowerCase += 1;
      }

      if (
        prev < i - 2 &&
        e.target.value[i] === e.target.value[i - 1] &&
        e.target.value[i] === e.target.value[i - 2]
      ) {
        cons += 1;
        prev = i;
      }
    }

    if (digits === 0) {
      error.numberError = true;
    } else {
      error.numberError = false;
    }

    if (upperCase === 0) {
      error.upperCaseError = true;
    } else {
      error.upperCaseError = false;
    }

    if (lowerCase === 0) {
      error.lowerCaseError = true;
    } else {
      error.lowerCaseError = false;
    }

    if (e.target.value.length < 6) {
      let diff = 6 - e.target.value.length;
      if (digits === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        } else if (diff > 0) {
          diff -= 1;
        }
      }
      if (lowerCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        } else if (diff > 0) {
          diff -= 1;
        }
      }
      if (upperCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        } else if (diff > 0) {
          diff -= 1;
        }
      }
      error.minSteps += cons;
      error.minSteps += diff;
    } else if (e.target.value.length > 20) {
      let diff = e.target.value.length - 20;
      if (digits === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      if (lowerCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      if (upperCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      if (cons > diff) {
        error.minSteps += cons;
      } else {
        error.minSteps += diff;
      }
    } else {
      if (digits === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      if (lowerCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      if (upperCase === 0) {
        error.minSteps += 1;
        if (cons > 0) {
          cons -= 1;
        }
      }
      error.minSteps += cons;
    }

    setPasswordError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If password passes all constraints, proceed with login logic
    // Todo: Add put call to backend
    console.log("Username:", username);
    console.log("Password:", password);
    console.log(
      SubArray([-100, 100, -50, 50, 49, 49, -50, 50, -50, 50, 49, 49])
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={"left-margin"}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={"left-margin"}>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => {
              checkError(e);
              setPassword(e.target.value);
            }}
            required
          />
          {showPassword ? (
            <RiEyeOffLine
              className="eye-icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <RiEyeLine
              className="eye-icon"
              onClick={() => setShowPassword(true)}
            />
          )}
          <div className="checkboxes">
            <div style={{ color: passwordError.lengthError ? "red" : "green" }}>
              <span
                className={
                  !passwordError.lengthError
                    ? "mini-checkbox valid"
                    : "mini-checkbox"
                }
              >
                &#x2713;
              </span>
              {
                "Password must be at least 6 characters and atmost 20 characters long"
              }
            </div>
            <div
              style={{ color: passwordError.upperCaseError ? "red" : "green" }}
            >
              <span
                className={
                  !passwordError.upperCaseError
                    ? "mini-checkbox valid"
                    : "mini-checkbox"
                }
              >
                &#x2713;
              </span>
              {"Password must have atleast 1 upper case letter."}
            </div>
            <div
              style={{ color: passwordError.lowerCaseError ? "red" : "green" }}
            >
              <span
                className={
                  !passwordError.lowerCaseError
                    ? "mini-checkbox valid"
                    : "mini-checkbox"
                }
              >
                &#x2713;
              </span>
              {"Password must have atleast 1 lower case letter."}
            </div>
            <div style={{ color: passwordError.numberError ? "red" : "green" }}>
              <span
                className={
                  !passwordError.numberError
                    ? "mini-checkbox valid"
                    : "mini-checkbox"
                }
              >
                &#x2713;
              </span>
              {"Password must have atleast 1 digit."}
            </div>
            <div
              style={{ color: passwordError.consCharError ? "red" : "green" }}
            >
              <span
                className={
                  !passwordError.consCharError
                    ? "mini-checkbox valid"
                    : "mini-checkbox"
                }
              >
                &#x2713;
              </span>
              {`Password cannot have more than 3 consecutive characters.`}
            </div>
          </div>
        </div>
        <div
          style={{ marginBottom: "10px" }}
        >{`Minimum number of steps required to make password strong is ${passwordError.minSteps}`}</div>
        <div>
          <button type="submit" disabled={!passwordError.lengthError}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
