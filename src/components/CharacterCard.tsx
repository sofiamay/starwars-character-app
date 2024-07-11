import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useGetCharacterQuery } from '../store';
import type { SwapiCharacter } from '../types';

interface CharacterCardProps {
  children?: ReactNode | undefined;
  uid: number;
  name: string;
  url: string;
  [props: string]: any;
}

CharacterCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  uid: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  rest: function(props: Object, propName: string, componentName: string) { },
};

function CharacterCard(props: CharacterCardProps) {
  const { children, uid, name, url, ...rest } = props;

  const { data, error, isFetching } = useGetCharacterQuery(uid);

  let photoQuery: string = "";


  let content = null;
  let character: any = {};
  if (isFetching) {
    content = <div>Loading character...</div>;
  } else if (error) {
    content = <div>Error loading character</div>
  } else {
    character = data.result satisfies SwapiCharacter;
    photoQuery = character.properties?.name ? encodeURI(character.properties.name) : "";
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{ character.properties?.name }</div>
        <ul className="character-attributes text-gray-400 ml-0">
          <li>Height: {character.properties.height} </li>
          <li>Mass: {character.properties.mass}</li>
          <li>Birthday: {character.properties.birth_year}</li>
        </ul>
      </div>
  </div>
  );
}

export default CharacterCard;