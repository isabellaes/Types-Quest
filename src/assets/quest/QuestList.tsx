import Quest from "./Quest";
import { useReducer, useRef } from "react";
import "./quest.scss";

const quests = [
  { id: "1", description: "Quest number 1", done: false },
  { id: "2", description: "Quest number 2", done: false },
  { id: "3", description: "Quest number 3", done: false },
  { id: "4", description: "Quest number 4", done: false },
  { id: "5", description: "Quest number 5", done: false },
];

const ACTION = {
  ADD: "add",
  EDIT: "edit",
  REMOVE: "remove",
};

type State = {
  id: string;
  description: string;
  done: boolean;
};

type Action = {
  type: string;
  payload?: { id?: string; description?: string };
};

const reducer = (state: State[], action: Action): State[] => {
  switch (action.type) {
    case ACTION.ADD:
      if (action.payload?.description)
        return [
          ...state,
          {
            id: Date.now().toString(),
            description: action.payload.description,
            done: false,
          },
        ];
      else return state;
    case ACTION.EDIT:
      if (action.payload?.id && action.payload?.description) {
        const index = state.findIndex((q) => q.id === action.payload?.id);
        if (index != -1) {
          state[index] = {
            id: state[index].id,
            description: action.payload.description,
            done: state[index].done,
          };

          return state;
        }
      } else return state;

    default:
      return state;
  }
};

const QuestList = () => {
  const [state, dispatch] = useReducer(reducer, quests);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddQuest() {
    if (inputRef.current) {
      dispatch({
        type: ACTION.ADD,
        payload: { description: inputRef.current.value },
      });
    }
  }

  return (
    <div className="quest-list">
      <div className="add">
        <label htmlFor="add">Add new quest:</label>
        <input
          type="text"
          id="add"
          placeholder="Description..."
          ref={inputRef}
        />
        <button onClick={() => handleAddQuest()}>Add</button>
      </div>

      <ul>
        {state.map((q) => (
          <li key={q.id}>
            <Quest id={q.id} description={q.description} done={q.done} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestList;
