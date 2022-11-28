import React from "react";

import { useFormik } from "formik";

import { Link, useLocation } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email Inválido";
  }

  if (!values.password) {
    errors.password = "Obrigatório";
  }

  return errors;
};

const email = localStorage.getItem('email') == null ? "" : localStorage.getItem('email');

const SignInForm = () => {
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: `${email}`,
      password: "",
    },
    validate,
    onSubmit: (values) => {
      fetch(`http://54.159.110.183:8081/api/auth/signin`, {
        method: "POST",
        headers: {
          Accept: "*/* , application/json, text/plain ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${values.email}`,
          password: `${values.password}`,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          res.json()
            .then((data) => {

              localStorage.setItem("token", data.token);
              localStorage.setItem("userID", data.id);
              localStorage.setItem("name", data.name);
              localStorage.setItem("lastname", data.lastname);
              localStorage.setItem("email", data.username);

            });
          setTimeout(() => {
            location.state
              ? (window.location.href = `${location.state}/reserve`)
              : (window.location.href = "/");
          }, 0);
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="signup_form">
        <div className="title">
          <h1>Iniciar Sessão</h1>
        </div>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button className="btn_login" type="submit">
          Login
        </button>
        <p>
          Ainda não possui conta? <Link to="/signup">Cadastre-se</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignInForm;