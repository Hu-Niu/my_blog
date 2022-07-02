<template>
  <div class="todo-app">
    <header>
      <el-input
        v-model="todoVal"
        placeholder="请输入待办事项"
        clearable
        @keyup.enter.native="addTodo"
      />
    </header>
    <section>
      <ul>
        <li
          v-for="(todo,index) in todos"
          :key="todo.uid"
        >
          <div class="read-box" v-show="!todo.edit">
            <el-button
              :class="{'done':todo.done}"
              :icon="todo.done ? 'el-icon-check':''"
              @click="changeDone(index)"
              circle
            />
            <span
              @dblclick="changeEditStatus(index)"
              :class="{'done':todo.done}"
            >
              {{ todo.text }}
            </span>
            <div class="delete-ico" @click="deleteTodo(index)">
              <svg-icon icon-class="delete"/>
            </div>
          </div>
          <div class="edit-box" v-show="todo.edit">
            <el-input
              v-model="todo.text"
              v-focus="todo.edit"
              @keyup.enter.native="editTodo(index)"
              @keyup.esc.native="escTodo(index)"
              @blur="editTodo(index)"
            />
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <div class="total">14 items</div>
      <ul>
        <li class="active">all</li>
        <li>Active</li>
        <li>Complete</li>
      </ul>
    </footer>
  </div>
</template>

<script>
import {todos} from './data'

export default {
  name: "TodoList",
  props: {},
  components: {},
  data() {
    return {
      todos: JSON.parse(todos).slice(0, 20),
      todoVal: '',
      isEdit: false,
    }
  },
  methods: {
    addTodo() {
      console.log(this.todoVal)
      console.log(111)
    },
    changeEditStatus(index) {
      let obj = this.todos[index]
      obj.edit = true;
      // https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
      // 两种方式实现响应式
      // this.todos.splice(index,1,obj)
      this.$set(this.todos, index, obj);
    },
    editTodo(index) {
      let obj = this.todos[index]
      obj.edit = false;
      this.$set(this.todos, index, obj);
    },
    escTodo(index) {
      let obj = this.todos[index]
      obj.edit = false;
      this.$set(this.todos, index, obj);
    },
    changeDone(index) {
      let obj = this.todos[index]
      obj.done = !obj.done;
      this.$set(this.todos, index, obj);
    },
    deleteTodo(index) {
      console.log(index)
      this.todos.splice(index, 1)
    },

  },
  computed: {},
  watch: {},
  mounted() {
    let arr = []
    this.todos.forEach(item => {
      item.edit = false
      arr.push(item)
    })
    this.todos = arr
  },
  directives: {
    focus(el, {value}, {context}) {
      if (value) {
        context.$nextTick(() => {
          // element ui 的input输入框被一层div包裹了
          el.children[0].focus()
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "TodoList";
</style>
