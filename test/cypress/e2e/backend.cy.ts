function req(method: Cypress.HttpMethod, path: string, body?: any) {
  return cy.request({ method, url: beUrl(path), body, failOnStatusCode: true });
}

function uuidLike() {
  // พอสำหรับ CHAR(36) ใน schema
  const s = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(-4);
  return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
}

function beUrl(path = '') {
  const base = Cypress.env('BACKEND_URL');
  if (!base) throw new Error('Missing BACKEND_URL in Cypress env');
  return `${base}${path}`;
}

//ตรวจสอบการตอบสนอง
describe("Backend", () => {
  it("check response", () => {
    const url = Cypress.env("BACKEND_URL");
    cy.request({
      method: "GET",
      url: `${url}/stock`,
    }).then((res) => {
      console.log(res);
      cy.log(JSON.stringify(res.body));
    });
  });
});

before(() => {
  const url = Cypress.env("BACKEND_URL");
  cy.request({
    method: "DELETE",
    url: `${url}/stock/all`,
  });
});

describe('Backend /stock API', () => {
  it('CORS should be enabled with wildcard', () => {
    req('GET', '/stock').then((res) => {
      expect(res.headers).to.have.property('access-control-allow-origin', '*');
    });
  });

  it('GET /stock returns an array', () => {
    req('GET', '/stock').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });
  
  it('GET /stock/owner returns fixed owner shape', () => {
    req('GET', '/stock/owner').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include.all.keys('id', 'name', 'course_id', 'section');
    });
  });

  it('PUT /stock creates an item', () => {
    const payload = {
      title: `Title-${Date.now()}`,
      category: 'General',
      amount: 7,
      productid: uuidLike(),
      imageUrl: 'https://example.com/x.png',
    };

    req('PUT', '/stock', payload).then((res) => {
      expect(res.status).to.eq(200);
      // รองรับรูปแบบ { msg, data }
      expect(res.body).to.have.all.keys('msg', 'data');
      const data = res.body.data;
      expect(data).to.include({
        title: payload.title,
        category: payload.category,
        amount: payload.amount,
      });
})

