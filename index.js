let result = document.getElementById("result");
let btn = document.getElementById("search_btn");
let url="https://thecocktaildb.com/api/json/v1/1/search.php?s=";

let getinformation=()=>{
    let user_input = document.getElementById("user_input").value;
    if(user_input.length == 0){
        result.innerHTML=`<h3 class="message">Please enter the name of the drink</h3>`
    }else{
        fetch(url+user_input).then(response => response.json()).then(data => {
            console.log("hello")
            console.log(user_input)
            console.log(data)
            console.log(data.drinks[0])
            let searched_drink=data.drinks[0];
            console.log(searched_drink.strDrink)
            console.log(searched_drink.strDrinkThumb)
            console.log(searched_drink.strInstructions)
            let count=1;
            let ingredients_arr=[];
            for(let i in searched_drink){
                let indgredient="";
                let measurement="";
                if(i.startsWith("strIngredient") && searched_drink[i]!=null){
                    indgredient=searched_drink[i];
                    if(searched_drink[`strMeasure`+count]!=null){
                        measurement=searched_drink[`strMeasure`+count];
                    }else{
                        measurement="";
                    }
                    count=count+1;
                    ingredients_arr.push(`${measurement} ${indgredient}`)
                }
            }
            console.log(ingredients_arr);
            result.innerHTML=`
            <img src=${searched_drink.strDrinkThumb}>
            <h2>${searched_drink.strDrink}</h2>
            <h3>Ingredients:</h3>
            <ul class="ingredient_list"></ul>
            <h3>Instructions:</h3>
            <p>${searched_drink.strInstructions}</p>
            `
            let ingredients_console=document.querySelector(".ingredient_list");
            ingredients_arr.forEach(item =>{
                let list_item=document.createElement("li");
                list_item.innerText=item;
                ingredients_console.appendChild(list_item);
            })
           
        })
        .catch(() => {
            result.innerHTML=`<h3>Please enter a vaild cocktail name</h3>`
        })
    }
}
let func=()=>{
    console.log('ehhlo')
}
window.addEventListener("load",getinformation)
btn.addEventListener("click",getinformation)