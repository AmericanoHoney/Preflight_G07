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
      expect(res.body).to.have.all.keys('msg', 'data');

      const data = res.body.data;
      expect(data).to.include({
        title: payload.title,
        category: payload.category,
        amount: payload.amount,
      });
      expect(data).to.have.property('id').and.to.be.a('string');
      expect(data).to.have.property('productid', payload.productid);
    });
  });

  it('PATCH /stock updates an item', () => {
    const createPayload = {
      title: `Title-${Date.now()}`,
      category: 'General',
      amount: 1,
      productid: uuidLike(),
      imageUrl: 'https://example.com/a.png',
    };

    req('PUT', '/stock', createPayload).then((createRes) => {
      const created = createRes.body.data;
      const updatePayload = {
        id: created.id,
        title: `Updated-${Date.now()}`,
        category: 'UpdatedCat',
        amount: 99,
        imageUrl: 'https://example.com/b.png',
      };

      req('PATCH', '/stock', updatePayload).then((updateRes) => {
        expect(updateRes.status).to.eq(200);
        expect(updateRes.body).to.have.all.keys('msg', 'data');
        // ตรวจซ้ำด้วย GET ทั้งหมด
        req('GET', '/stock').then((listRes) => {
          const items: any[] = listRes.body;
          const found = items.find((x) => x.id === created.id);
          expect(found).to.exist;
          expect(found.title).to.eq(updatePayload.title);
          expect(found.category).to.eq(updatePayload.category);
          expect(found.amount).to.eq(updatePayload.amount);
        });
      });
    });
  });

  it('DELETE /stock removes an item', () => {
    // สร้างก่อน
    const createPayload = {
      title: `Title-${Date.now()}`,
      category: 'General',
      amount: 3,
      productid: uuidLike(),
      imageUrl: 'https://example.com/c.png',
    };

    req('PUT', '/stock', createPayload).then((createRes) => {
      const created = createRes.body.data;
      req('DELETE', '/stock', { id: created.id }).then((delRes) => {
        expect(delRes.status).to.eq(200);
        expect(delRes.body).to.have.all.keys('msg', 'data');
        expect(delRes.body.data).to.have.property('id', created.id);

        // ยืนยันว่าหายไปแล้ว
        req('GET', '/stock').then((listRes) => {
          const items: any[] = listRes.body;
          const stillThere = items.some((x) => x.id === created.id);
          expect(stillThere).to.eq(false);
        });
      });
    });
  });
});