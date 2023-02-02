import supertest from "supertest";
import app from "../src/app";
import { FruitInput } from "services/fruits-service";

const api = supertest(app);

describe("GET /fruits", () => {
  it("should respond with status 200 and fruits data", async () => {
    const body: FruitInput = {
      name: "banana",
      price: 4,
    };

    await supertest(app).post("/fruits").send(body);

    const response = await api.get("/fruits");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      },
    ]);
  });
});

describe("GET /fruits/:id", ()=>{

  it("Should response with status 404 if there is no fruit",async ()=>{
    const response = await api.get("/fruits/1")    
    expect(response.status).toEqual(404);
  })

  it(" Should respond with status 200 and specific fruit", async () =>{
    const body: FruitInput = {
      name: "banana",
      price: 4,
    };

    await supertest(app).post("/fruits").send(body);
    const response = await api.get("/fruits/1")
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      {
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      },
    );
  });  
})