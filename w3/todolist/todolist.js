/* 할 일 완료 토글*/
function toggleCompleted() {
  this.classList.toggle('completed');
}

/* 할 일 삭제 */
function removeTodo() {
  this.parentElement.remove();
}

/* 모든 할 일 삭제 */ 
function allClearList() {
  var list = document.getElementById("addTodo");

/* 삭제전 확인문구 호출 */
  if (list.childNodes.length > 0) {
    var confirmClear = confirm("모든 할 일을 삭제하시겠습니까?");
    if (confirmClear) {
      list.innerHTML = "";
    }
  } else {
    alert("삭제할 할 일이 없습니다.");
  }
}

/* 할 일 추가 */
function addTodo() {
  var inputValue = document.getElementById("todoInput").value.trim();
  
/* 빈글일 시 문구 호출*/
  if (!inputValue) {
    alert("할 일을 입력해주세요!");
    return;
  }

  var li = document.createElement("li");
  li.textContent = inputValue;

  var removeButton = document.createElement("span");
  removeButton.className = "remove-btn";
  removeButton.textContent = "❌";
  removeButton.onclick = removeTodo;

  li.appendChild(removeButton);
  li.onclick = toggleCompleted;

  document.getElementById("addTodo").appendChild(li); // 할 일 목록에 li 요소 추가
  document.getElementById("todoInput").value = ""; // 입력창 초기화
}

/* 윈도우 엔터,  mac 엔터(리턴) 키 입력 시 할일 추가 */
document.getElementById("todoInput").addEventListener("keypress", function(event) {
  
/* 엔터키의 키코드 13, 리턴키의 키코드 값은 10 */ 
  if (event.key === "Enter" || event.key === "Return") {
    addTodo();
  }
});

