import { Input, Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ value, onChange }) => {
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {

      if (Number(ev.target.value) == ev.target.value) { 
        onChange(ev.target.value); 
      } else {
        return
      }
    },
    [onChange],
  );

  return (
    <Box>
      <Input value={value} borderRadius={0} width="full" onChange={onChangeHandler} />
    </Box>
  );
};

export default Cell;
