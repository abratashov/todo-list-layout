import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  // HelpBlock
} from 'react-bootstrap'

const TextField = ({ label, placeholder, className, value, onChange}) => (
  <FormGroup className={className}>
    { label && <ControlLabel>{label}</ControlLabel> }
    <FormControl
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange.bind(this)}
    />
    {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
  </FormGroup>
)

export default TextField
