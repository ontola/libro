export default () => ({
  MuiInputBase: {
    input: {
      // font: null,
    },
    root: {
      backgroundColor: '#f8f8f8',
    },
  },
  MuiOutlinedInput: {
    notchedOutline: {
      borderColor: '#e6e6e6',
    },
    root: {
      '&.Mui-focused .MuiInputBase-input': {
        backgroundColor: '#ffffff',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3b3b3',
      },
    },
  },
});
