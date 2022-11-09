describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  describe('아이디 입력 테스트', () => {
    beforeEach(() => {
      cy.get('#id-input').clear();
    });

    it('영문 및 숫자이외에는 들어올 수 없다.', () => {
      cy.get('#id-input')
        .type('dwsfdwf!')
        .blur()
        .then(() => cy.get('[data-cy="cy-id-validated-message"]'))
        .should('contain.text', '올바른 아이디 형식으로 입력해주세요.');
    });

    it('영문 및 숫자만 들어올 시 유효한 입력으로 간주한다.', () => {
      cy.get('#id-input')
        .type('dwsfdwf1')
        .blur()
        .then(() => cy.get('[data-cy="cy-id-validated-message"]'))
        .should('have.css', 'opacity', '0');
    });

    it('입력은 5글자 이상들어와야한다.', () => {
      cy.get('#id-input')
        .type('asdf')
        .blur()
        .then(() => cy.get('[data-cy="cy-id-validated-message"]'))
        .should('contain.text', '올바른 아이디 형식으로 입력해주세요.');
    });

    it('입력은 30자 이하여야한다.', () => {
      cy.get('#id-input')
        .type('asdfnwiaofnafoi124hiodanaoifbafoiawbfwa124dwa')
        .blur()
        .then(() => cy.get('[data-cy="cy-id-validated-message"]'))
        .should('contain.text', '올바른 아이디 형식으로 입력해주세요.');
    });

    it('유효한 입력을 하면 에러 메시지가 안보이게 된다.', () => {
      cy.get('#id-input')
        .type('dwsfdwf!')
        .blur()
        .then(() => cy.get('#id-input').clear().type('dwsfdwf1').blur())
        .then(() =>
          cy.get('[data-cy="cy-id-validated-message"]').should('have.css', 'opacity', '0')
        );
    });
  });

  describe('비밀번호 입력 테스트', () => {});

  describe('로그인 폼 테스트', () => {});
});
