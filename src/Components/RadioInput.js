const RadioInput = ({label, value, checked, setter}) => {
	return (
	  <label>
	    <input type="radio" checked={checked === value}
	           onChange={() => setter(value)} />
	    <span>{label}</span>
	  </label>
	);
};

export default RadioInput;