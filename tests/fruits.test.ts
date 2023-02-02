import supertest from "supertest";
import app from "../src/app";
import { FruitInput } from "services/fruits-service";

export type FruitName = Omit<FruitInput, "price">;

const api = supertest(app);

describe("POST /fruits", () => {
  it("Should response with status 422 if the sent body is invalid body", async () => {
    const body: FruitName = {
      name: "banana",
    };

    const response = await supertest(app).post("/fruits").send(body);

    expect(response.status).toEqual(422);
  });

  it("Should respond with status 201", async () => {
    const body: FruitInput = {
      name: "banana",
      price: 4,
    };

    const response = await supertest(app).post("/fruits").send(body);

    expect(response.status).toEqual(201);
  });

  it("Should respond with status 409 when there is a fruit with given name", async () => {
    const body: FruitInput = {
      name: "banana",
      price: 4,
    };

    const response = await supertest(app).post("/fruits").send(body);

    expect(response.status).toEqual(409);
  });
});

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

describe("GET /fruits/:id", () => {
  it("Should response with status 404 if there is no fruit", async () => {
    const response = await api.get("/fruits/2");

    expect(response.status).toEqual(404);
  });

  it(" Should respond with status 200 and specific fruit", async () => {
    const body: FruitInput = {
      name: "banana",
      price: 4,
    };

    await supertest(app).post("/fruits").send(body);

    const response = await api.get("/fruits/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });
});
