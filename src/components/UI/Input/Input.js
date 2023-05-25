import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// we can pass props AND refs from the parent component, in most cases we'll use props, but passing down a ref is also possible!
// in order to export it outside, we need to wrap our component in a special function, called forwardRef. We pass our component as an argument to this method - and it returns a React Component, which has the capability of being bound to the Ref.
const Input = React.forwardRef((props, ref) => {
  //using useRef hook and storing it in 'inputRef'
  const inputRef = useRef();

  //custom inner function for focusing the input
  const activate = () => {
    inputRef.current.focus();
  };

  //useImperativeHandle takes two arguments: 1. ref, 2. function which returns an object
  //we can use this object as a translation from inner function - activate - to the outside world, via custom name - here 'focus'
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

// After binding the component to the ref, now Input is able to take a ref prop and it will expose a ref, and it is usable with ref. But the only things that ARE getting exposed must be within useImperativeHandle hook. Now it's only 'focus: activate' which points to the inner function which focuses an input.
export default Input;
