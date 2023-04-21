const express = require("express");
const router = express.Router();
const TodoDB = require("../models/todo.js");

router.get("/", (req, res) => {
  res.send("Hi!");
});

// 할 일 생성 API
router.post("/todos", async (req, res) => {
  const {value} = req.body;

  // db 존재 유무 체크 : 이미 저장된 order값보다 +1 값으로 저장
  const maxOrderByUserId = await TodoDB.findOne().sort("-order").exec(); // order값을 역순으로 조회할 거다. .exec()를 써서 해당하는 걸 완료한다.

  // maxOrderByUserId가 값이 없다면 1을 할당하고, 있다면 +1을 할당할 것임
  const order = maxOrderByUserId ?
    maxOrderByUserId.order+1 :    // 값이 있을 때
    1;                            // 값이 없을 때

  // order 값을 바탕으로 데이터 생성
  const todo = new TodoDB({value, order});
  await todo.save();

  res.send({todo});
});


// 할 일 조회 API
router.get("/todos", async (req, res) => {
  const todos = await TodoDB.find().sort("-order").exec();
  res.send({todos});
});


// 할 일 수정 API - 순서(order), 값(value), 체크(done)
router.patch("/todos/:todoId", async (req, res) => {
  const {todoId} = req.params;
  const {order, done, value} = req.body;

  // 1. todoId에 해당하는 할 일이 있는가? ---------------------------------------------------
  // 1-1. todoId에 해당하는 할 일이 없으면, 에러 출력
  const currentTodo = await TodoDB.findById(todoId);
  if (!currentTodo) {
    return res.status(400).json({"errorMessage": "존재하지 않는 할 일 입니다."});
  };

  // 2. order에 값이 있을 경우에는 순서를 변경한다. ---------------------------------------------------
  if (order) {
    const targetTodo = await TodoDB.findOne({order}).exec();
    // targetTodo 값이 존재유무 체크
    if (targetTodo) {
      // targetTodo.order(방금 DB에서 order로 찾은 order)를 currentTodo.order(아까 DB에서 todoId로 찾은 order로 교체)
      targetTodo.order = currentTodo.order;
      // 그리고 저장
      await targetTodo.save();
    }
    // 그리고 기존 DB에 있던 order값을 바꿔줘야지
    currentTodo.order = order;
    await currentTodo.save();
  }

  // 3. done에 값이 있을 경우에는 done 값 변경 ---------------------------------------------------
  const doneAt = done ? new Date() : null;
  await currentTodo.updateOne({doneAt});

  // 4. value에 값이 있을 경우에는 value 값 변경 ---------------------------------------------------
  if (value) {
    currentTodo.value = value;
    await currentTodo.save();
  };

  res.send();
});


// 할 일 삭제 API
router.delete("/todos/:todoId", async (req, res) => {
  const {todoId} = req.params;

  // 1. todoId에 해당하는 할 일이 있는가?
  // 1-1. todoId에 해당하는 할 일이 없으면, 에러 출력
  const currentTodo = await TodoDB.findById(todoId);
  if (!currentTodo) {
    return res.status(400).json({"errorMessage": "존재하지 않는 할 일 입니다."});
  };

  // 2. todoId에 값이 있을 경우에는 삭제한다.
  if (todoId) {
    await currentTodo.deleteOne();
  }
  res.send();
});

module.exports = router;