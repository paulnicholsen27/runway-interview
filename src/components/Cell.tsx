import { Input, Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Cell: React.FC<Props> = ({ value, onChange, onKeyPress }) => {
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  const displayValue = (value) => { // this has a bug in that the commas and $ then become part of the value stored in state
    if (value && Number(value.replace(",", "")) == value.replace(",", "")) {
      return "$" + parseFloat(value).toLocaleString("en-US")
    } else {
      return value
    }
  }

  return (
    <Box>
      <Input value={displayValue(value)} borderRadius={0} width="full" onChange={onChangeHandler} onKeyPress={onKeyPress} />
    </Box>
  );
};

export default Cell;
