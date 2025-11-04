import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileInputBox(props: any) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    // Pass the selected file to the parent
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size exceeds 2MB. Please choose a smaller file.');
        setFileName(null); // Clear previous file name
        props.onChange(null); // Pass null to indicate error state
      } else {
        setFileError(null); // Reset error message
        setFileName(file.name); // Set the chosen file name
        props.onChange(file); // Pass file to parent component
      }
    }
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>{props.name}</FormLabel>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            width: '100%',
            textTransform: 'none',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
            },
          }}
        >
          <CloudUploadIcon sx={{ marginRight: 1 }} />
          {fileName ? fileName : 'Choose File'}
          <input
            type="file"
            onChange={handleFileChange}
            accept={props.accept}
            hidden
          />
        </Button>
      </div>

      <FormHelperText sx={{ color: 'white' }}>
        You can upload a maximum of 2MB.
      </FormHelperText>

      {fileError && (
        <Typography sx={{ color: 'red', mt: 1 }}>
          {fileError}
        </Typography>
      )}
    </FormControl>
  );
}

export default React.memo(FileInputBox);
