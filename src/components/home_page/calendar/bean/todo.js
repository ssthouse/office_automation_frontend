class Todo {

  constructor () {
    this.content = ''
    this.time = new Date().getTime()
    this.creater = ''
  }

  // TODO
  static getTodoList () {
    let todoList = []
    for (let i = 0; i < 5; i++) {
      let todo = new Todo()
      todo.content = 'content' + i
      todo.time = new Date().getTime() + i * 24 * 60 * 60 * 1000
      todoList.push(todo)
    }
    return todoList
  }
}

export default Todo
