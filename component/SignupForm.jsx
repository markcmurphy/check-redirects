import React, { useEffect, useState } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const override = css`
  display: flex;
  margin: 8vh 0 0 3vw;
  border-color: red;
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

function ListItem({ value }) {
  return (
    <li>
      <b>
        <a
          href={`https://developer.bigcommerce.com/api-reference/${value}`}
          target={"_blank"}
          rel="noopener noreferrer"
        >
          {value}
        </a>
      </b>
    </li>
  );
}

function NumberList(props) {
  console.log(
    '🚀 ~ file: SignupForm.jsx ~ line 68 ~ NumberList ~ props',
    props
  );

  const numbers = props.numbers;
  const listItems = numbers.map((number, index) => (
    <ListItem key={index} value={number} />
  ));
  return <ol>{listItems}</ol>;
}

const SignupForm = () => {
  const [errors, setErrors] = useState([]);
  const [errorDisplay, setErrorDisplay] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [formBody, setFormBody] = useState('');
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState('#0000FF');

  const changeHandler = (event) => {
    setFormBody(event.target.value);
    setIsSelected(true);
  };

  return (
    <>
      <h1>Redirect Checker!</h1>
      <ol>
        <li>Insert redirect file contents</li>
        <li>{`First line must be "from to type"`}</li>
        <li>Ensure no empty space at end of input</li>
        <li>Click submit</li>
      </ol>
      <p>Note: App may fail with longer inputs. Needs optimization.</p>
      <Formik
        initialValues={
          {
            // file: null,
            // markdown: 'dfg'
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          setErrors([])
          setLoading(!loading);
          async function postData(url) {
            const response = await fetch(url, {
              method: 'POST',
              body: formBody,
            });
            return response.json();
          }
          const result = await postData('/api/lint');
          console.log(
            '🚀 ~ file: SignupForm.jsx ~ line 109 ~ onSubmit={ ~ result',
            result
          );
          setErrors(result);
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Redirect File"
            name="markdown"
            type="text"
            onChange={changeHandler}
            placeholder="from to type"
          />
          {/* <input type="file" name="file" onChange={changeHandler} /> */}
          {/* {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{' '}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )} */}

          {/* <MySelect label="Project" name="projectId">
            <option value="">Select a project</option>
            <option value="cHJqOjIwNjAz">API-Reference</option>
            <option value="cHJqOjI4MDIz">DevDocs</option>
          </MySelect> */}
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div>
        {errorDisplay}

        {!errors.length ? (
          <div className="sweet-loading">
            <ClimbingBoxLoader
              loading={loading}
              color={'maroon'}
              // loading={true}
              css={override}
              size={35}
            />
          </div>
        ) : null}
        <NumberList numbers={errors} />
      </div>
    </>
  );
};

export { SignupForm };
