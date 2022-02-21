const RadioInput = ({label, value, checked, setter}) => {
	return (
	  <label className="radio">
	    <input type="radio" checked={checked === value}
	           onChange={() => setter(value)} />
	    <span>{label}</span>
	  </label>
	);
};

export default RadioInput;