const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

const testDatabase = "mongodb://localhost:27017/test-db";

beforeAll(async () => {
  await mongoose.connect(testDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Task API", () => {
  it("should add a new task", async () => {
    const response = await request(app).post("/tasks").send({
      name: "New Task",
      description: "Description of the new task",
      date: "2024-2-06",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("New Task");
    expect(response.body.description).toBe("Description of the new task");
    expect(response.body.date).toBe("2024-2-06");
  });

  it("should get all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should update a task", async () => {
    const taskId = "5f4cb99a8d4a1e23c4c3a482";

    const response = await request(app).put(`/tasks/${taskId}`).send({
      name: "Updated Task",
      description: "Updated description",
      date: "2024-02-06",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Updated Task");
    expect(response.body.description).toBe("Updated description");
    expect(response.body.date).toBe("2024-02-06");
  });
});
