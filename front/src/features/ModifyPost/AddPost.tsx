import {useAppDispatch} from '../../app/hooks.ts';
import {useState} from 'react';
import {Grid2, TextField} from '@mui/material';
import FileInput from '../../components/FileInput/FileInput.tsx';
import Button from '@mui/material/Button';
import {IPostMutation} from '../../types';

const initialState:IPostMutation = {
  title: '',
  description: '',
  image: null,
};

const AddPost = () => {
  const dispatch = useAppDispatch();
  const [postForm, setPostForm] = useState(initialState);

  const onChangeNewsForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setPostForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();


  };


  return (
    <>
      <Grid2 container gap={2} flexDirection="column" component="form" onSubmit={onSubmit}>
        <TextField
          value={postForm.title}
          label="Title"
          onChange={onChangeNewsForm}
          id="title"
          name="title"
          variant="outlined"
          color="primary"
          fullWidth
        />
        <TextField
          value={postForm.description}
          label="Description"
          onChange={onChangeNewsForm}
          id="description"
          name="description"
          variant="outlined"
          color="primary"
          fullWidth
        />
        <FileInput name="image" label="image" onGetFile={onChangeFile} />
        <Button type="submit" variant="contained" color="primary">
          Add News
        </Button>
      </Grid2>
    </>
  );
};

export default AddPost;