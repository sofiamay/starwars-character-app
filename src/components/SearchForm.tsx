import { ChangeEventHandler, useState } from "react";
import Button from "./Button";
import './SearchForm.scss';


function SearchForm() {
  const [inputText, setInputText] = useState("");

  const inputHandler: ChangeEventHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <section className="SearchForm">
      <div className="content-block">
        <div className="flex flex-col gap-4 items-center text-center">
          <h3 className="heading">Search</h3>

          <div className="search flex flex-row gap-4">
            <input type="text" id="search-input" name="search-input" maxLength={24} value={inputText} onChange={inputHandler} />
            <Button type="secondary"> Submit </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;