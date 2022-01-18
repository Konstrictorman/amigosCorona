import React,  { forwardRef }  from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export const CustomNumberFormat = forwardRef(function CustomNumberFormat(props, ref) {
   const { onChange, ...other } = props;
   
   return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  });

  CustomNumberFormat.propTypes = {
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
 };  
