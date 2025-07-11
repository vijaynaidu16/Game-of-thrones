import { useEffect, useState } from "react";
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { addCharacters } from "../utils/gotAPI";
import store from "../utils/store";

export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string; // "https://thronesapi.com/assets/images/jon.jpg"
}

export type CharactersResponse = Character[];

const Home = () => {
  const [data, setData] = useState<CharactersResponse>([]);
//   const [error, setError] = useState<number | null>(null);
const dispatch = useDispatch();
const showCharacter = useSelector((store) => store.character.characters);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://thronesapi.com/api/v2/Characters`);
      if (!res.ok) {
        setData([]);
        // setError(404);
        return;
      }
      const data = await res.json();
      setData(data);
    dispatch(addCharacters(data));
    //   setError(200);
      console.log(data);
    } catch {
      setData([]);
    //   setError(404);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 flex-wrap  ">
      {showCharacter.map((data: any) => (
        <div key={data.id} className="w-1/4 border border-white text-center flex flex-col justify-center items-center mx-auto">
          <h1 className="text-xl font-bold Bricolage-Grotesque">{data.title}</h1>
          <img
            className="rounded-lg w-50 h-50"
            src={`https://thronesapi.com/assets/images/${data.image}`}
            alt={data.image}
          />
          <h1 className="poppins">{data.fullName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;
