import { useState } from "react";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowTaskModal(false);
  }

  function handleEditTask(task) {
    setUpdateTask(task);
    setShowTaskModal(true);
  }

  function handleCloseTask() {
    setShowTaskModal(false);
    setUpdateTask(null);
  }

  function handleDeleteTask(taskId) {
    const deleteAfterTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteAfterTask);
  }

  function handleAllDeleteTask() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      })
    );
  }

  function handleSearch(searchTerm) {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showTaskModal && (
        <TaskModal
          onSave={handleAddTask}
          updateTask={updateTask}
          onCloseHandle={handleCloseTask}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowTaskModal(true)}
            onAllDeleteTask={handleAllDeleteTask}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
