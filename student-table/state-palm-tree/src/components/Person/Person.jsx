import PersonInformationList from "./PersonInformationList";
import PropTypes from "prop-types";
import { useState } from "react";
const personListTypes = [
	{
	title:	"Phone Numbers",
	fieldName:	"phoneNumbers",
	labelField: "name",
	valueField: "number",
	},
	{
	title:	"Addresses",
	fieldName: "addresses",
	labelfield: "name",
	valuefield: "address",
	},
	{
	title:	"Emails",
	fieldName: "emails",
	labelfield: "name",
	valuefield: "email",
	},
];


const Person = (props) => {
	const [activeListType, setActiveListType] = useState("emails");
	const handleListTypeChange = (newListType) => {
		setActiveListType(newListType);
	};
	
	console.log("rendered", Math.random());
	return (
		<div className="person">
		  <div onClick={props.onRemovePerson} className="person-remove-x">X</div>
		  <div className="side">
			<img className="person-avatar" src={props.avatar} alt={props.name} />
			<h1 className="person-name">{props.name}</h1>
		</div>
		<div className="info">
			{personListTypes.map((listType) => {
			return (
				<PersonInformationList 
				type={listType.fieldName}
				activeType={activeListType} 
				personData={props}
				onListTypeChange={handleListTypeChange} 
				/>
			);
			})}
		</div>
		</div>
		);
	};	

Person.propTypes = {
	name:	PropTypes.string,
};

Person.defaultProps = {
	name:	"Unknown",
};

export default Person;