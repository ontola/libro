export default () => ({
  MuiAutocomplete: {
    listbox: {
      '& > div': {
        maxHeight: 'calc(40vh - 16px)',
      },
    },
    root: {
      '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        minWidth: 0,
      }
    },
  },
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
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b3b3b3',
      },
    },
  },
});
