import React, { useEffect, useState} from 'react';
import '../../pages/ItemsAndMovesModel.css';

interface HeldItem {
    name: string
    url: string
}

interface itemProps {
    handleItemSelection: (itemName: string) => void
}

const HeldItemList : React.FC<itemProps> = ({handleItemSelection}) => {
    
    // useState statements to set intial state of all these state variables
    const [heldItems, setItems] = useState<HeldItem[]>([]);
    const [searchedItem, setSearchedItem] = useState<string>('');
    const [showAllItems, setShowAllItems] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>('');

    // useEffect statement to handle api call when the page is rendered
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try{
            // async calls to two api endpoints searching for items within each category
            const response1 = await fetch(`https://pokeapi.co/api/v2/item-attribute/holdable`);
            const response2 = await fetch(`https://pokeapi.co/api/v2/item-attribute/holdable-active/`)
            if (!response1.ok || !response2)
                {
                    throw new Error('Item list not found!')
                }
            // set each item related data to response once we convert it to json
            const itemData1 = await response1.json();
            const itemData2 = await response2.json();

            // maps through each data response setting the name and url to the item name and url of the response body
            const helditemsList1 = itemData1.items.map((item : {name : string; url : string}) => ({
                name: item.name,
                url: item.url
            }))
            const helditemsList2 = itemData2.items.map((item : {name : string; url : string}) => ({
                name: item.name,
                url: item.url
            }))

            // consolidates both responses into an array called all items
            const allItems = [...helditemsList1, ...helditemsList2]

            // filters through the all items away, creates a new array of only unique items (no duplicates)
            const uniquieItems = allItems.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.name === item.name
                ))
            )
            // set the originally empty heldItems array to whatever items are in the uniqueItems array
            setItems(uniquieItems);
        }
        catch(error)
        {
            console.log("Error fetching items:", error);
        }
    }

    // Event handler for specific search input
    const handleItemSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchedItem(e.target.value)
    }
    const filterSearchedItems = heldItems.filter(item =>
        item.name.toLowerCase().includes(searchedItem.toLowerCase())
    )

    const handleItemSelections = (itemName : string) => {
        setSelectedItem(itemName);
        setSearchedItem('');
    }

    const button = document.querySelector("#show-all-items");
    button?.addEventListener ("click", onClick, false);
    function onClick (event : any) {
        event.preventDefault();
        handleShowAllItems();
    }


    // handlers for opening and closing modal of items.
    const handleShowAllItems = () => {
        setShowAllItems(true);
    }
    const handleCloseModal = () => {
        setShowAllItems(false);
    }

    // returns html text that we want to render on the screen
    return (
        <div>
            <input type="text" placeholder='Search for holdable item...' value={searchedItem} onChange={handleItemSearch}/>
            {searchedItem && (
                <ul>
                    {filterSearchedItems.map((item, index) => (
                        <li key={index} onClick={()=>handleItemSelection(item.name)}>
                            <button>{item.name}</button>
                        </li>
                    ))}
                </ul>
            )}
            {!searchedItem && (
                <div>
                    <button id="show-all-items"onClick={handleShowAllItems}>Show All Items</button>
                </div>  
            )}
            {showAllItems && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>All Items</h2>
                        <ul>
                            {heldItems.map((item, index) =>
                                <li key={index} onClick={() => {handleCloseModal(), handleItemSelection(item.name), handleItemSelections(item.name) }}>{item.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            
            <p>Selected item: {selectedItem}</p>
        </div>
    )
}

export default HeldItemList;