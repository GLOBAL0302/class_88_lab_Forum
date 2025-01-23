import { Grid2, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  return (
    <>
      <input name={name} type="file" ref={inputRef} onChange={onFileChange} style={{ display: 'none' }} />
      <Grid2 container alignItems="center" gap={2}>
        <Grid2>
          <TextField disabled label={label} value={fileName} onChange={activateInput} />
        </Grid2>
        <Grid2>
          <Button variant="contained" color="secondary" onClick={activateInput}>
            Select Image
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FileInput;
