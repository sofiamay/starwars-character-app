import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Button from "./Button";
import './SearchForm.scss';
/* Redux */
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store";
/* Action Types */
import { SearchCharactersParams } from "../store/apis/charactersApi";


function SearchForm() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const onSubmit:MouseEventHandler = function() {
    const actionPayload: SearchCharactersParams = {
      name: inputText,
    }

    dispatch(setSearchQuery(actionPayload));
  }

  const inputHandler: ChangeEventHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <section className="SearchForm">
        <div className="section-content">
          <div className="form flex flex-col gap-8 items-center text-center bg-accent-dark">
            <div className="search flex flex-row gap-4">
              <input type="text" id="search-input" name="search-input" placeholder="Search (optional)" maxLength={24} value={inputText} onChange={inputHandler} />
              <Button type="primary" onClick={onSubmit}> Submit </Button>
            </div>
          </div>
        </div>
    </section>
  );
}

export default SearchForm;