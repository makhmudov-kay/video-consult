export const QuillConfig = {
  // toolbar: '.toolbar',
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      ['link'],
    ],
  },
};
