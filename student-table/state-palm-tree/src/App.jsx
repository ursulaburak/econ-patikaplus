import "./App.css";
import Person  from "./components/Person/Person";
import { initialPhoneBook } from "./data"; 
import usePhonebook from "./hooks/usePhonebook";
function App() {
  const {phoneBook, handleAddPerson, handleRemovePerson } = usePhonebook(initialPhoneBook);
  
  return (
    <>
      <button 
      onClick={() =>
        handleAddPerson ({
           name: "Hakan",
           avatar: "https://gravatar.com/avatar/c49a915c101b0f64551be368109b83c8?s=400&d=robohash&r=x",
           phoneNumbers: [
            { name: "work", number: "123 456 7890" },
            { name: "home", number: "444 212 0000" },
           ],
            addresses: [
            { name: "work", address: "Istanbul" }, 
            { name: "home", address: "Ankara" },
          ],
            emails: [],
        })
      }
    >   
        Hakan'ı Ekle
      </button>

      {phoneBook.map((person, idx) =>  {
          return  (
            <Person
              onRemovePerson={()=>handleRemovePerson(idx)}
              key={person.name}
              avatar={person.avatar}
              name={person.name}
              phoneNumbers={person.phoneNumbers}
              addresses={person.addresses}
              emails={person.emails}
            />
          );
        })}
      </>
    );
  }

export default App;
