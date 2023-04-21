const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    value:String,   // 할일이 어떤 것인지 확인하는 컬럼
    doneAt:Date,    // 할일이 언제 완료되었는지 확인하는 컬럼
    order:Number    // 몇번째 할일인지 확인하는 컬럼
});

// Frontend를 사용하기 위해 필요한 것 : 조회를 했을 때 가상으로 만들어지는 컬럼
// mongoDB에 있는 _id 컬럼을 todoId로 클라이언트에게 보여줄 것임!!
// .toHexString() : _id 의 혹시라도 생길 에러를 줄여주기 위한 문자열 변환 메서드
TodoSchema.virtual("todoId").get(()=>this._id.toHexString());

// TodoSchema를 사용하기 위해서 어떤 타입으로 변경을 했을 때 보여줄 거냐에 대한 설정
// 위의 todoId를 JSON 형태로 변환하였을 때 보여준다라는 의미
TodoSchema.set("toJSON", {virtuals: true});

// TodoSchema를 외부로 내보내주기
module.exports = mongoose.model("Todo", TodoSchema);