const mockElement = {
    innerHTML: '',
  };
  
  document.getElementById = jest.fn((id) => {
    if (id === 'previousQuestion' || id === 'display') {
      return mockElement;
    }
    return null;
  });