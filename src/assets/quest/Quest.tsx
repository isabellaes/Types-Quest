type Quest = {
  id: string;
  description: string;
  done: boolean;
};

const Quest = (props: Quest) => {
  return (
    <div className="quest">
      <p>Id: {props.id}</p>
      <p>Description: {props.description}</p>
      <label htmlFor="check">Done: </label>
      <input id="check" type="checkbox" />
    </div>
  );
};

export default Quest;
