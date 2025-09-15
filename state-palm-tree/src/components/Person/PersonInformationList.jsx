const PersonInformationList = ({ 
    personData, 
    type, 
    activeType, 
    onListTypeChange,
}) => {
    return (
       <div key={type.fieldName} className="person-list-entry">
         <h2 className="list-type" onClick={()=>onListTypeChange(type.fieldName)}>{type.title}</h2>
         {activeType === type.fieldName && (
           <ul>
              {personData[type.fieldName].map((listItem) => {
               return (
                 <li key={listItem.name}>
                 <span className="list-label">
                     {listItem[type.labelField]}
                 </span>
                 <span className="list-value">
                     {listItem[type.valueField]}
                 </span>
                 </li>
              );
          })}
      </ul>
	  )}   
      </div> 
    );
};

export default PersonInformationList;