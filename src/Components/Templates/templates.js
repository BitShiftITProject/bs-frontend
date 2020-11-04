export const templates = {
  blank: [],
  curriculumVitae: [
    {
      title: 'Profile',
      content: {
        sections: [
          [{ id: 'text', data: '<h1>Hello world!</h1>' }],
          [{ id: 'text', data: '<p>Enter your profile details here.</p>' }]
        ]
      }
    },
    {
      title: 'Experience',
      content: {
        sections: [
          [{ id: 'text', data: '<h1>Experience</h1>' }],
          [{ id: 'text', data: '<p>Enter your work experience details here.</p>' }]
        ]
      }
    },
    {
      title: 'Education',
      content: {
        sections: [
          [{ id: 'text', data: '<h1>Education</h1>' }],
          [{ id: 'text', data: '<p>Enter your education history details here.</p>' }]
        ]
      }
    }
  ]
}
