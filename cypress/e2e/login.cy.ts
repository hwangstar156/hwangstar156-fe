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

  describe('비밀번호 입력 테스트', () => {
    beforeEach(() => {
      cy.get('#password-input').clear();
    });

    it('입력은 소문자,대문자,숫자만 들어와야한다.', () => {
      cy.get('#password-input')
        .type('dwsfdwfG241!')
        .blur()
        .then(() => cy.get('[data-cy="cy-password-validated-message"]'))
        .should('contain.text', '올바른 비밀번호 형식으로 입력해주세요.');
    });

    it('소문자,대문자,숫자가 모두 들어올 시 유효한 입력으로 간주한다.', () => {
      cy.get('#password-input')
        .type('Ghkdwjdals12')
        .blur()
        .then(() => cy.get('[data-cy="cy-password-validated-message"]'))
        .should('have.css', 'opacity', '0');
    });

    it('입력은 8글자 이상들어와야한다.', () => {
      cy.get('#password-input')
        .type('asdfghj')
        .blur()
        .then(() => cy.get('[data-cy="cy-password-validated-message"]'))
        .should('contain.text', '올바른 비밀번호 형식으로 입력해주세요.');
    });

    it('입력은 30자 이하여야한다.', () => {
      cy.get('#password-input')
        .type('asdfnwiaofnafoi124hiodanaoifbafoGawbfwa124dwa')
        .blur()
        .then(() => cy.get('[data-cy="cy-password-validated-message"]'))
        .should('contain.text', '올바른 비밀번호 형식으로 입력해주세요.');
    });

    it('유효한 입력을 하면 에러 메시지가 안보이게 된다.', () => {
      cy.get('#password-input')
        .type('dwsfdwfG241!')
        .blur()
        .then(() => cy.get('#password-input').clear().type('Ghkdwjdals12').blur())
        .then(() =>
          cy.get('[data-cy="cy-password-validated-message"]').should('have.css', 'opacity', '0')
        );
    });
  });

  describe('로그인 버튼 테스트', () => {
    it('초기 버튼은 비활성화 상태로 렌더링 된다.', () => {
      cy.get('[data-cy="cy-login-button"]').should('be.disabled');
    });

    it('아이디와 비밀번호가 모두 유효할 시 버튼이 활성화 된다.', () => {
      cy.get('#id-input').type('dwsfdwf1').blur();
      cy.get('#password-input').type('Ghkdwjdals12').blur();

      cy.get('[data-cy="cy-login-button"]').should('not.be.disabled');
    });

    it('아이디와 비밀번호가 하나라도 유효하지 않을시 버튼이 비활성화 된다.', () => {
      cy.get('#id-input').type('dwsfdwf!').blur();
      cy.get('#password-input').type('Ghkdwjdals12').blur();

      cy.get('[data-cy="cy-login-button"]').should('be.disabled');
    });
  });

  describe('로그인 폼 동작테스트', () => {
    it('로그인에 성공할 시 HOME으로 돌아가게 된다.', () => {
      cy.get('#id-input').type('dwsfdwf1').blur();
      cy.get('#password-input').type('Ghkdwjdals12').blur();

      cy.get('[data-cy="cy-login-button"]').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });
  });
});
