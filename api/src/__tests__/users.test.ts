describe('get users', () => {
  const data = 2;
  it('should get user id', () => {
    expect(data).toBe(2);
  });

  it('should error', () => {
    expect(data).not.toBe(4);
  });
});
