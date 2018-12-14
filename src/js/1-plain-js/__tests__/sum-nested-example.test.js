describe('Sum', () => {
  beforeEach(() => {
    console.log('(A) Outer describe');
  });

  it('adds 1 + 2 to equal 3', () => {});

  it('adds 5 + 1 to equal 6', () => {});

  describe('when using invalid parameters', () => {
    beforeEach(() => {
      console.log('(B) Nested describe');
    });

    it('throws if a character is provided', () => {});

    it('does some other test', () => {});
  });
})
