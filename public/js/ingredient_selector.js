

const ingredients =[];

const options =document.getElementsByClassName("ingredient-option");

for(const option of options){
    option.addEventListener("click",(e)=>{
        e.preventDefault();
        const value = e.target.value;
        if(ingredients.includes(value)){
            const indexOfValue = ingredients.indexOf(value);
            ingredients.splice(indexOfValue,1);
            option.classList.remove("selected");
        }
        else{
            ingredients.push(value);
            option.classList.add("selected");
        }
        console.log(ingredients);
    })
}

const form = document.getElementById("new-dish");

form.addEventListener("submit",(e)=>{
    e.target.ingredients.value=ingredients.join(",")
    console.log(e.target.ingredients.value)
})