export const Suggestions = ({ suggestionList, applyMention }) => {
  const selectSuggestion = (item) => {
    applyMention(item); // THIS MIMICS AN ONCHANGE EVENT
  };

  const suggestionItems = suggestionList.map((item) => (
    <div
      className="item"
      onMouseDown={() => selectSuggestion(item.name)}
      role="button"
      key={item.id}
    >
      {item.name}
    </div>
  ));

  return <div className="container">{suggestionItems}</div>;
};
