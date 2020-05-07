// Input, Textarea, Select, Radio, Checkbox

exports.options = [
  {
    // Shorthand (key is used as label)
    custom_name: 'string', // Input or TextArea
    node_version: [10, 12, 13, 14] || {
      // Select
      '14': '14.2.0-stretch-slim',
      '13': '13.14.0-stretch-slim',
      '12': '12.16.3-stretch-slim',
      '10': '10.20.1-stretch-slim',
    },
    python_version: [2, 3] || {
      // Radio
      '2': '2.7.18-slim-buster',
      '3': '3.8.2-slim-buster',
    },
    alpine: 'boolean', // Checkbox
  },
  {
    // Longform (More customizable)
    custom_name: {
      // Input or TextArea
      element: 'input' || 'textarea',
      label: 'Enter custom name',
      placeholder: 'Ex: hello-world',
      value: '',
      optional: false,
    },
    node_version: {
      // Select
      label: 'Enter custom name',
      optional: false,
      value: 12 || '12.16.3-stretch-slim',
      options: [10, 12, 13, 14] || {
        '14': '14.2.0-stretch-slim',
        '13': '13.14.0-stretch-slim',
        '12': '12.16.3-stretch-slim',
        '10': '10.20.1-stretch-slim',
      },
    },
    python_version: {
      // Radio
      label: 'Enter custom name',
      optional: false,
      value: 3 || '3.8.2-slim-buster',
      options: [2, 3] || {
        '2': '2.7.18-slim-buster',
        '3': '3.8.2-slim-buster',
      },
    },
    alpine: {
      // Checkbox
      label: 'Use alpine?',
      value: false,
      optional: false,
    },
  },
];
