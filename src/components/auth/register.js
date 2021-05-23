import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/auth";
import { useAsync } from "react-hook-async";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username must length than 6 characters!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Password must length than 4 characters!")
    .max(50, "Too Long!")
    .required("Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm password not matched!")
    .required("Required"),
  policy: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const Register = ({ onMoveToLogin }) => {
  const [registerApiData, fetchRegister] = useAsync(null, register);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      bio: "",
      education: "",
      policy: false,
    },
    onSubmit: (values) => {
      fetchRegister(
        values.username,
        values.password,
        values.bio,
        values.education
      )
        .then(() => {
          setSuccessModalVisible(true);
        })
        .catch(() => {
          setFailureModalVisible(true);
        });
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <Modal show={successModalVisible} centered>
        <Modal.Body className="alert-success text-center">
          <Alert variant="success" className="border-0">
            <Alert.Heading>Registered</Alert.Heading>
            <p>Please check your inbox!</p>
          </Alert>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSuccessModalVisible(false);
              onMoveToLogin();
            }}
          >
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
      <Modal show={failureModalVisible} centered>
        <Modal.Body className="alert-danger text-center">
          <Alert variant="danger" className="border-0">
            <Alert.Heading>Something went wrong</Alert.Heading>
            {registerApiData.error && (
              <p>{registerApiData.error.response.data.err}</p>
            )}
          </Alert>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setFailureModalVisible(false)}
          >
            Okay
          </Button>
        </Modal.Body>
      </Modal>

      <div className="loginCard ">
        <Form className="m-4 text-center" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicUsername" className="text-left">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
              isInvalid={formik.errors.username}
              placeholder="Enter userName"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="text-left">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="password"
              isInvalid={formik.errors.password}
              value={formik.values.password}
              placeholder="Password"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            controlId="formBasicConfirmPassword"
            className="text-left"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="confirmPassword"
              isInvalid={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="text-left">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="bio"
              isInvalid={formik.errors.bio}
              value={formik.values.bio}
              placeholder="Bio"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.bio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="text-left">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="education"
              isInvalid={formik.errors.education}
              value={formik.values.education}
              placeholder="Education"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.education}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <p style={{ display: "inline-flex" }}>
              <Form.Check
                type="checkbox"
                name="policy"
                value={formik.values.policy}
                isInvalid={formik.errors.policy}
                onChange={formik.handleChange}
                required
              />
              I agree to the&nbsp;
              <span className="link">Terms of Use</span>&nbsp; and &nbsp;
              <span className="link"> Privacy Notice</span>
            </p>
            <Form.Control.Feedback type="invalid">
              {formik.errors.policy}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="m-color border-none"
            type="submit"
            style={{ width: "60%" }}
            disabled={registerApiData.loading}
          >
            {registerApiData.loading ? "Registering" : "Register"}
          </Button>
          <Form.Label>
            You have an account? &nbsp;
            <span className="link" onClick={onMoveToLogin}>
              Login
            </span>
            &nbsp; now!
          </Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default Register;
