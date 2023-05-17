import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <div>
      <Form className="d-flex me-auto w-100  " onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products..."
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search" className='btnCart'>
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBox;
