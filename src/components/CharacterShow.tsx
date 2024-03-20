import { useGetCharactersByPageQuery } from "../store";


function CharacterShow() {
  const { data, error, isFetching } = useGetCharactersByPageQuery(1);

  let content = null;
  if (isFetching) {
    content = <div>Loading characters...</div>;
  } else if (error) {
    content = <div>Error loading characters</div>
  } else {
    let characters: any[] = [];
    data.results?.forEach((result: any) => {
      characters.push({
        uid: result.uid,
        name: result.name,
        url: result.url
      });
    });
    content = characters.map((character: any) => {
      return <div>
        {character.uid}
        {character.name}
        {character.url}
      </div>;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Testing Character Show</h3>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}

export default CharacterShow;